from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

from disease_cure import disease_cure
from class_names import CLASS_NAMES

app = Flask(__name__)
CORS(app)

model = load_model("plant_disease_model.keras")
IMG_SIZE = 224

def predict_disease(img_path):
    img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    class_index = int(np.argmax(predictions))

    # 🔍 SANITY TEST (TEMPORARY)
    print("Predicted index:", class_index)
    print("Predicted class:", CLASS_NAMES[class_index])

    return CLASS_NAMES[class_index]


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    temp_path = f"temp_{file.filename}"
    file.save(temp_path)

    disease = predict_disease(temp_path)
    info = disease_cure.get(
        disease,
        {
            "cause": "Information not available",
            "cure": ["Consult an agricultural expert"]
        }
    )

    os.remove(temp_path)

    return jsonify({
        "disease": disease,
        "cause": info["cause"],
        "cure": info["cure"]
    })

if __name__ == "__main__":
    app.run(debug=True)
