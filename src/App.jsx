import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
<meta name="viewport" content="width=device-width, initial-scale=1.0" />


// --- REUSABLE SCROLL ANIMATION WRAPPER ---
// This component watches when elements enter the screen and fades them in
function RevealOnScroll({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    // IntersectionObserver watches when the element enters the viewport  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop watching once it has revealed
        }
      });
    }, { threshold: 0.15 }); // Triggers when 15% of the item is visible

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");

       async function handleFormSubmit(e) {
    e.preventDefault();

    // 1. Send the form data (POST) to your Express backend
    const response = await fetch("https://portfolio-backend-two-theta-63.vercel.app/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contactName,
        message: contactMessage,
      }),
    });

    // 2. Read the reply (res) sent back by Express
    const data = await response.json();

    // 3. If Express confirmed success, show alert and clear the boxes
    if (data.success) {
      alert(`Thank you ${contactName}! Your message has been sent.`);
      setContactName("");
      setContactMessage("");
    }
  }

  function renderPageContent() {
    if (currentPage === "Home") {
      return (
        <div className="page-container">
          {/* Hero Section */}
          <RevealOnScroll>
            <section className="hero-section">
              <span className="badge">✨ Available for New Projects</span>
              <h1>Building Fast, Modern Web Experiences.</h1>
              <p>
                Hi, I'm Anthony and I am a Frontend Developer specializing in clean React applications, 
                responsive layouts, and interactive user interfaces.
              </p>
              <div className="hero-buttons">
                <button className="primary-btn" onClick={() => setCurrentPage("Contact")}>
                  Work With Me
                </button>
                <button className="secondary-btn" onClick={() => setCurrentPage("About")}>
                  Learn More
                </button>
              </div>
            </section>
          </RevealOnScroll>

          {/* Scrollable Feature Cards */}
          <RevealOnScroll>
            <section className="features-section">
              <h2>What I Do</h2>
              <div className="cards-grid">
                <div className="info-card">
                  <div className="card-icon">⚡</div>
                  <h3>Fast Performance</h3>
                  <p>Optimized React components that load quickly and run smoothly on any device.</p>
                </div>
                <div className="info-card">
                  <div className="card-icon">📱</div>
                  <h3>Responsive Design</h3>
                  <p>Layouts crafted with CSS Grid and Flexbox to look sharp on phones and desktops.</p>
                </div>
                <div className="info-card">
                  <div className="card-icon">🛠️</div>
                  <h3>Clean Architecture</h3>
                  <p>Organized, easy-to-read codebases built with modern JavaScript best practices.</p>
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* Extra Scroll Section to test the reveal effect */}
          <RevealOnScroll>
            <section className="cta-banner">
              <h2>Ready to bring your idea to life?</h2>
              <p>Let's collaborate on your next website or web application.</p>
              <button className="primary-btn" onClick={() => setCurrentPage("Contact")}>
                Start a Conversation
              </button>
            </section>
          </RevealOnScroll>
        </div>
      );
    }

        if (currentPage === "About") {
      return (
        <div className="page-container">
          {/* 1. Intro Header */}
          <RevealOnScroll>
            <section className="about-header">
              <span className="badge">👋 Behind the Code</span>
              <h2>About My Journey 📖</h2>
              <p>
                I started learning web development with a simple goal: to understand how websites 
                work, I started with HTML, moved to CSS, started Javascript and now React
              </p>
            </section>
          </RevealOnScroll>

          {/* 2. Quick Highlights / Stats */}
          <RevealOnScroll>
            <div className="cards-grid">
              <div className="info-card">
                <h3>Pushed myself</h3>
                <p>Built from scratch using modern frontend tools and responsive design.</p>
              </div>
              <div className="info-card">
                <h3>100% Responsive</h3>
                <p>Every layout is tested to look clean on mobile phones, tablets, and desktops.</p>
              </div>
              <div className="info-card">
                <h3>Always Learning</h3>
                <p>Continuously improving code quality, accessibility, and performance.</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* 3. Core Story Cards */}
          <RevealOnScroll>
            <section className="features-section">
              <h2>My Approach</h2>
 
              <div className="cards-grid">
                <div className="info-card">
                  <h3>🎯 My Mission</h3>
                  <p>To write clean, accessible code that solves real everyday problems simply.</p>
                </div>
                <div className="info-card">
                  <h3>💻 Tech Stack</h3>
                  <p>React, JavaScript (ES6+), CSS3 Grid/Flexbox, and HTML</p>
                </div>
                <div className="info-card">
                  <h3>🚀 What's Next</h3>
                  <p>Expanding into full-stack engineering with Node.js, Express, and databases.</p>
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* 4. Bottom Call to Action */}
          <RevealOnScroll>
            <section className="cta-banner">
              <h2>Want to see what I can build for you?</h2>
              <p>Let's talk about your project ideas or collaboration opportunities.</p>
              <button className="primary-btn" onClick={() => setCurrentPage("Contact")}>
                Get In Touch
              </button>
            </section>
          </RevealOnScroll>
        </div>
      );
    }

    if (currentPage === "Contact") {
      return (
        <div className="page-container">
          <RevealOnScroll>
            <h2>Get in Touch ✉️</h2>
            <p>Have a project in mind or just want to say hello? Fill out the form below.</p>
            
            <div className="contact-layout">
              <form onSubmit={handleFormSubmit} className="contact-form">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={contactName} 
                  onChange={(e) => setContactName(e.target.value)} 
                  required 
                />
                <textarea 
                  placeholder="Tell me about your project..." 
                  value={contactMessage} 
                  onChange={(e) => setContactMessage(e.target.value)} 
                  rows="5" 
                  required
                ></textarea>
                <button type="submit" className="primary-btn">Send Message</button>
              </form>

              <div className="contact-details">
                <div className="info-card">
                  <h3>Contact Info</h3>
                  <p><strong>📍 Location:</strong> Lagos/Enugu</p>
                  <p><strong>📧 Email:</strong> Starboyanthony417@gmail.com</p>
                  <p><strong>⏰ Response Time:</strong> Within 24 hours</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      );
    }
  }

  return (
    <div className="site-wrapper">
      <nav className="site-navbar">
        <div className="nav-logo" onClick={() => setCurrentPage("Home")}>
          ⚡ DevSite
        </div>
        <ul className="nav-links">
          <li 
            className={currentPage === "Home" ? "active-link" : ""} 
            onClick={() => setCurrentPage("Home")}
          >
            Home
          </li>
          <li 
            className={currentPage === "About" ? "active-link" : ""} 
            onClick={() => setCurrentPage("About")}
          >
            About
          </li>
          <li 
            className={currentPage === "Contact" ? "active-link" : ""} 
            onClick={() => setCurrentPage("Contact")}
          >
            Contact
          </li>
        </ul>
      </nav>

      <main className="main-stage">
        {renderPageContent()}
      </main>

      <footer className="site-footer">
        <p>© 2026 DevSite Portfolio. Built with React & CSS.</p>
      </footer>
    </div>
  );
}

export default App;
