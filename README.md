# Bloomify AI 🌱

Bloomify AI is an intelligent plant assistant that helps users identify plant diseases and receive plant care guidance.
Users can upload images of plant leaves, and the system predicts possible diseases using a trained deep learning model.

---

# Features

• 🌿 Plant disease detection using deep learning
• 📷 Image-based disease prediction
• 🌤 Plant care and environmental tips
• 🪴 Beginner-friendly plant guidance

---

# Project Structure

```
Bloomify
│
├── Backend
│   ├── app.py
│   ├── class_names.py
│   ├── disease_cure.py
│  
│
├── Frontend
│   └── my-app
│
└── README.md
```

---

# Important: Python Version

TensorFlow requires **Python 3.10**.

Please make sure your Python version is:

```
Python 3.10
```

You can check using:

```
python --version
```

---

# Download the Trained Model

The trained model is not included in this repository because of GitHub file size limits.

Download the model from Google Drive:

```
https://drive.google.com/file/d/1kYtNpg8QlsU_qUbmpSU-QwtCQlqhoTGr/view?usp=sharing
```

Place the downloaded file here:

```
Backend/plant_disease_model.keras
```

---

# Installation and Setup

## 1. Clone the Repository

```
git clone https://github.com/Amruta-05/bloomify-ai.git
cd bloomify-ai
```

---

# 2. Backend Setup

Go to backend folder:

```
cd Backend
```

Create a virtual environment:

```
python -m venv .venv
```

Activate virtual environment:

```
.venv/Scripts/Activate
```

Install required packages:

```
pip install tensorflow
pip install numpy
pip install pillow
pip install flask
pip install flask-cors
```

Run the backend server:

```
python app.py
```

---

# 3. Frontend Setup

Open another terminal and go to frontend folder:

```
cd Frontend/my-app
```

Install node dependencies:

```
npm install
```

Run the frontend:

```
npm run dev
```

---

# 4. Open the Application

Open your browser and visit:

```
http://localhost:5173
```

---

# Quick Checklist

✔ Clone the repository
✔ Download the trained model from Google Drive
✔ Place model inside Backend folder
✔ Activate virtual environment
✔ Run backend server
✔ Run frontend server

---

# Technologies Used

• Python
• TensorFlow
• Flask
• React
• Vite
• JavaScript
• Deep Learning

---

# Author

Amruta
