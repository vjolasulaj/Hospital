import React, { useState } from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/email/send-email", {
        name,
        email,
        phone,
        details,
      });
      setMessage("Message sent successfully");
      setName("");
      setEmail("");
      setPhone("");
      setDetails("");
    } catch (error) {
      setMessage("Error sending message");
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="navbar-container">
          <div className="logo">MedInsight</div>
          <ul className="inner-nav">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <div className="login-div">
            <Link to="/admin-login">
              <button>Log In</button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="landing-page container">
        <div className="landing-container">
          <img src="DOCTOR1.png" alt="Doctor" />
        </div>
        <div className="landing-text">
          <h5>Professional medical services 24/7.</h5>
          <h3>Your health is our priority.</h3>
        </div>
      </div>
      <section className="about-us">
        <h2>About Us</h2>
        <div className="about-container">
          <div className="image-about">
            <img src="3doctors.jpg" alt="Doctors" />
          </div>
          <div className="about-text">
            <h3>Leading the way in Healthcare.</h3>
            <h5>At MedInsight, we blend compassionate care with medical excellence, ensuring every patient receives the highest quality treatment in a trusted, nurturing environment...</h5>
          </div>
        </div>
      </section>
      <section className="our-services">
        <div className="inner-services">
          <h2>Our Services</h2>
          <div className="services-container">
            <div className="services-text1">
              <h3>Your Complete Medical Guide</h3>
              <h4>Your Comprehensive HandBook for Medical Services </h4>
            </div>
            <div className="services-box">
              <div className="services">
                <div className="services-text2">
                  <h3>Surgical Services</h3>
                  <p>Skilled surgeries provide precise treatment provide precise treatment, ensuring effective care and optimal recovery for patients in need of medical interverntion.</p>
                </div>
              </div>
              <div className="services" id="blue-service">
                <div className="services-text2">
                  <h3>Emergency Care</h3>
                  <p>Immediate expert care for sudden illnesses or injuries care  for usdden illnesses or injuries ensures timely treatment, promoting swift recovery for patients in need.</p>
                </div>
              </div>
              <div className="services">
                <div className="services-text2">
                  <h3>Home Health Caring</h3>
                  <p>Customized home health care offers ease and enhances wellness providing personalized services for patients in need.</p>
                </div>
              </div>
            </div>
            <button type="button" className="view-all">
              View All Services
            </button>
          </div>
        </div>
      </section>
      <section className="contact-section">
        <div className="contact-info">
          <img src="contact.png" alt="Contact" />
          <h3>Contact with us and share your problems.</h3>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="form-inputs">
            <label>Name:</label>
            <input
              type="text"
              className="inputs"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              className="inputs"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone:</label>
            <input
              type="text"
              className="inputs"
              placeholder="Contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Your details:</label>
            <input
              type="text"
              className="inputs"
              placeholder="Tell us more about your consultation"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button type="submit" className="send">Send Message</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </section>
      <footer>
        <div className="footer-inner">
          <h3 className="footer-logo">MedInsight</h3>
          <h4>The world's most trusted healthcare destination.</h4>
        </div>
        <div className="footer-bottom"> &copy; 2024 MedInsight.</div>
      </footer>
    </>
  );
};

export default HomePage;
