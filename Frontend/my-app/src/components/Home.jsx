import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import DiseasePredict from "./DiseasePredict";

export default function Home() {
  const textList = [
    "Grow Your Digital Presence",
    "Smart Solutions for Nature",
    "Build Your Green Brand",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);
  const [darkMode, setDarkMode] = useState(() => {
    // Load theme from localStorage on initialization
    const savedTheme = localStorage.getItem("bloomify-theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resultData, setResultData] = useState(null);
  const fileInputRef = useRef(null);

  // Persist theme to localStorage and update document root when darkMode changes
  useEffect(() => {
    localStorage.setItem("bloomify-theme", JSON.stringify(darkMode));
    // Apply theme class to root element for global styling
    if (darkMode) {
      document.documentElement.classList.add("dark-theme");
      document.documentElement.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  // Initialize theme on mount from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("bloomify-theme");
    if (savedTheme !== null) {
      const theme = JSON.parse(savedTheme);
      setDarkMode(theme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setDarkMode(true);
      }
    }
  }, []);

  const handleFeatureClick = (featureName) => {
    console.log(`Clicked: ${featureName}`);
    setIsFeaturesOpen(false);
    // Scroll to respective section
    if (featureName === "Space Analysis") {
      scrollToSection("interactive-demo");
    } else if (featureName === "AI Plant Doctor") {
      scrollToSection("ai-doctor");
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleImageSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setResultData(null);
  };

  const handleModalResult = (data) => {
    setResultData(data);
    setShowModal(true);
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [showModal]);

  // Typing Effect FIXED
  useEffect(() => {
    const currentText = textList[textIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setSpeed(120);

        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setSpeed(70);

        if (displayText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textList.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, textList, speed]);

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">🌿 Bloomify</h2>

        <ul className="nav-links">
          <li>Home</li>
          <li onClick={() => scrollToSection("levels")}>Levels</li>
          <li
            className="nav-link-dropdown"
            onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
          >
            Features
            <ul className={`dropdown-menu ${isFeaturesOpen ? "show" : ""}`}>
              <li className="dropdown-item" onClick={(e) => { e.stopPropagation(); handleFeatureClick("Space Analysis"); }}>Space Analysis</li>
              <li className="dropdown-item" onClick={(e) => { e.stopPropagation(); handleFeatureClick("AI Plant Doctor"); }}>AI Plant Doctor</li>
            </ul>
          </li>
          <li>Our Community</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>

        <div className="nav-actions">
          <button className="btn-outline">Login</button>
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-left fade-in">
          <p className="hero-tag">🌿 Bloomify — Green Innovation</p>

          <h1 className="hero-title">
            {displayText}
            <span className="cursor">|</span>
          </h1>

          <p className="hero-desc">
            We help brands grow sustainably with eco-friendly technology,
            AI automation, and modern digital solutions inspired by nature.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>

        <div className="hero-right">
          <svg viewBox="0 0 500 650" preserveAspectRatio="none" className="wave-mask">
            <defs>
              <clipPath id="waveClip">
                <path d="
                  M 80 0
                  C 40 80, 160 160, 80 240
                  C 0 320, 140 400, 80 480
                  C 20 560, 140 640, 80 650
                  L 500 650
                  L 500 0
                  Z
                "/>
              </clipPath>
            </defs>

            <image
              href="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=100"
              width="100%"
              height="100%"
              clipPath="url(#waveClip)"
              preserveAspectRatio="xMidYMid slice"
            />
          </svg>
        </div>
      </section>



        {/* AI PLANT DOCTOR SECTION */}
<section className="ai-doctor-section" id="ai-doctor">
  <div className="ai-doctor-container">
    <h2 className="ai-doctor-title">AI Plant Doctor</h2>
    <p className="ai-doctor-subtitle">
      Early Detection, Better Harvests: AI for Plant Health Monitoring
    </p>

    <div
      className={`upload-card ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="file-input-hidden"
      />

      {previewUrl ? (
        <div className="preview-container">
          <img src={previewUrl} alt="Preview" className="preview-image" />
          <div className="preview-overlay">
            <button
              className="change-btn"
              onClick={handleButtonClick}
            >
              Change Image
            </button>
            <button
              className="clear-btn"
              onClick={clearImage}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="upload-prompt">
          <div className="upload-icon">📷</div>
          <button className="upload-btn" onClick={handleButtonClick}>
            Upload Image
          </button>
          <p className="upload-hint">or drag and drop an image</p>
        </div>
      )}
    </div>

    {/* ✅ Prediction Result Appears Here */}
    {selectedImage && (
      <div className="prediction-wrapper">
      <DiseasePredict selectedImage={selectedImage} onShowModal={handleModalResult} />
     </div>
    )}

    {/* RESULT MODAL */}
    {showModal && resultData && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>✕</button>
          
          <div className="modal-header">
            <h2>🌿 Diagnosis Result</h2>
          </div>

          <div className="modal-body">
            <div className="result-item disease-item">
              <span className="result-label">Disease</span>
              <span className="result-value">{resultData.disease}</span>
            </div>

            <div className="result-item cause-item">
              <span className="result-label">Cause</span>
              <span className="result-value">{resultData.cause}</span>
            </div>

            <div className="result-item cure-item">
              <span className="result-label">Recommended Care</span>
              <ul className="cure-list">
                {resultData.cure && resultData.cure.map((item, index) => (
                  <li key={index}>✅ {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="modal-footer">
            <button className="modal-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    )}

  </div>
</section>


      {/* ABOUT */}
      <section className="about-section" id="about">
        <h2 className="about-title">About Bloomify</h2>

        <div className="timeline">

          <div className="timeline-item normal">
            <div className="timeline-text">
              Bloomify helps urban gardeners grow healthier plants using smart AI guidance, 
              eco-friendly practices, and nature-inspired innovation.
            </div>
            <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6" className="timeline-img" />
          </div>

          <div className="timeline-item reversed">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" className="timeline-img" />
            <div className="timeline-text">
              Our mission is to simplify plant care for beginners and professionals through
              automation, climate analysis, and sustainable growth techniques.
            </div>
          </div>

          <div className="timeline-item normal">
            <div className="timeline-text">
              With weather tracking, plant diagnosis, and smart reminders,
              Bloomify empowers users to grow greener, smarter, and sustainably.
            </div>
            <img src="https://i.pinimg.com/564x/e2/c9/3d/e2c93da020390f2d53cfbb0988b337b9.jpg" className="timeline-img" />
          </div>

          <div className="timeline-line"></div>
        </div>
      </section>

      {/* LEVEL SECTION */}
      <section className="level-section" id="levels">
        <h2 className="level-title">Choose Your Growing Level</h2>
        <p className="level-subtitle">
          Start your plant journey and grow at your own pace.
        </p>

        <div className="level-grid">

          <div className="level-card">
            <div className="level-icon">🌱</div>
            <h3>Beginner</h3>
            <ul className="level-list">
              <li>Upload plant photos</li>
              <li>Watering reminders</li>
              <li>Starter kits</li>
            </ul>
            <button className="level-btn primary">Start</button>
          </div>

          <div className="level-card">
            <div className="level-icon">🌿</div>
            <h3>Intermediate</h3>
            <ul className="level-list">
              <li>Soil health tracking</li>
              <li>Growth journal</li>
              <li>Fertilizer guide</li>
            </ul>
            <button className="level-btn primary">Explore</button>
          </div>

          <div className="level-card">
            <div className="level-icon">🌳</div>
            <h3>Advanced</h3>
            <ul className="level-list">
              <li>Hydroponics tutorials</li>
              <li>AI diagnosis</li>
              <li>Rare plants</li>
            </ul>
            <button className="level-btn primary">Launch</button>
          </div>

        </div>
      </section>

      {/* DEMO */}
      <section className="demo-section" id="interactive-demo">
        <div className="demo-header">
          <span className="demo-pill">⚡ Interactive Demo</span>
          <h2>See Bloomify in Action</h2>
        </div>

        <div className="demo-card">
          <div className="demo-image">
            <img src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6" />
            <div className="play-btn">▶</div>
          </div>

          <div className="demo-content">
            <h3>Smart Space Analysis</h3>
            <p>Upload photos to get AI-powered plant recommendations.</p>
            <button className="btn-primary">Try Demo</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <h2 className="testimonials-header-title">Loved by Gardeners</h2>

        <div className="testimonials-grid">

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              Bloomify transformed my balcony into a mini garden!
            </p>
            <div className="testimonial-user">
              <img src="https://i.pravatar.cc/100?img=12" />
              <div>
                <h4>Sarah Mitchell</h4>
                <span>New York</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              I can finally keep plants alive thanks to Bloomify!
            </p>
            <div className="testimonial-user">
              <img src="https://i.pravatar.cc/100?img=5" />
              <div>
                <h4>Marcus Lee</h4>
                <span>San Francisco</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              Perfect seasonal guidance and reminders.
            </p>
            <div className="testimonial-user">
              <img src="https://i.pravatar.cc/100?img=32" />
              <div>
                <h4>Priya Sharma</h4>
                <span>Mumbai</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          {/* Column 1: Brand */}
          <div className="footer-column">
            <div className="footer-brand">
              <h3 className="footer-logo">🌿 Bloomify</h3>
              <p className="footer-tagline">Your smart plant care companion</p>
            </div>
          </div>

          {/* Column 2: Support Links */}
          <div className="footer-column">
            <h4 className="footer-title">Support</h4>
            <nav className="footer-links">
              <a href="#help" className="footer-link">Help Center</a>
              <a href="#faq" className="footer-link">FAQ</a>
              <a href="#contact" className="footer-link">Contact Us</a>
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#terms" className="footer-link">Terms & Conditions</a>
            </nav>
          </div>

          {/* Column 3: Social Media */}
          <div className="footer-column">
            <h4 className="footer-title">Follow Us</h4>
            <div className="social-links">
              <a href="https://instagram.com" className="social-icon" title="Instagram" target="_blank" rel="noopener noreferrer">
                📷
              </a>
              <a href="https://facebook.com" className="social-icon" title="Facebook" target="_blank" rel="noopener noreferrer">
                f
              </a>
              <a href="https://twitter.com" className="social-icon" title="Twitter" target="_blank" rel="noopener noreferrer">
                𝕏
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          © 2026 Bloomify — All Rights Reserved
        </div>
      </footer>

    </div>
  );
}
