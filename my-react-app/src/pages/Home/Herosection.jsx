import { useState, useEffect } from "react";
import "./home.css";

import child1 from "../../assets/child1.jpg";
import child2 from "../../assets/child2.avif";
import logo from "../../assets/logo.png";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [child1, "LOGO", child2];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  return (
    <section className="hero" id="home">
      <div className="hero-slider">

        <div className={`hero-slide ${activeSlide === 0 ? "active" : ""}`}>
          <img src={child1} alt="Child 1" />
        </div>

        <div className={`hero-slide ${activeSlide === 1 ? "active" : ""}`}>
          <div className="hero-center-wrap">
            <h4 className="hero-welcome">Welcome to Bal Vatsalya Marga</h4>
            <p>Where compassion meets action for child welfare.</p>

            <div className="hero-logo-box">
              <img src={logo} alt="Bal Vatsalya Logo" />
            </div>

            <div className="hero-website-name">
              <span>Bal</span> <span>Vatsalya</span> <span>Marga</span>
            </div>

            <p className="hero-tagline">
              Committed to Child Welfare & Growth
            </p>
          </div>
        </div>

        <div className={`hero-slide ${activeSlide === 2 ? "active" : ""}`}>
          <img src={child2} alt="Child 2" />
        </div>

        <div className="hero-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={activeSlide === index ? "active-dot" : ""}
              onClick={() => setActiveSlide(index)}
            ></span>
          ))}
        </div>

        <button
          className="slider-btn"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "▶" : "⏸"}
        </button>

      </div>
    </section>
  );
};

export default HeroSection;