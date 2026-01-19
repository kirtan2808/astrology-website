import React, { useState } from "react";
import "../../style/ContectUs/ContectUs.css";
import { API_BASE } from "../../utils/streamAI"; // ✅ SAME AS MULANK

const ContactUs = () => {

  // 🔹 FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // 🔹 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 SUBMIT FORM
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/contact-send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      alert("Server error. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">

      <div className="contact-intro">
        <h1>Contact Us</h1>
        <p>
          We’re here to guide you.
          Reach out whenever you feel the need for clarity and direction.
        </p>
      </div>

      <div className="contact-wrapper">

        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Numerology is a personal journey.
            If you have questions, doubts, or need guidance,
            feel free to connect with us.
          </p>

          <div className="contact-details">
            <p><strong>Email:</strong> vansh.905471@gmail.com</p>
            <p><strong>Phone:</strong> +91 1234567890</p>
            <p><strong>Location:</strong> India</p>
          </div>

          <div className="contact-note">
            We usually respond within 24 hours.
          </div>
        </div>

        <div className="contact-form">
          <h2>Send a Message</h2>

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              rows="5"
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            className="contact-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>

      </div>

      <div className="contact-quote">
        <p>
          “Every question you ask is the first step toward awareness.”
        </p>
      </div>

    </div>
  );
};

export default ContactUs;
