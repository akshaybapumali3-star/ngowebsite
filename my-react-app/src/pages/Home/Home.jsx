import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import HeroSection from "./Herosection";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import banner4 from "../../assets/banner4.png";
import banner5 from "../../assets/banner5.avif";
import banner6 from "../../assets/banner6.jpg";
import banner7 from "../../assets/banner7.jpg";
import banner8 from "../../assets/banner8.webp";

// Twitter Embed Component
const TwitterPhone = () => {
  const twitterRef = useRef(null);

  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        window.twttr.widgets.load(twitterRef.current);
      };
    } else {
      window.twttr.widgets.load(twitterRef.current);
    }
  }, []);

  return (
    <div ref={twitterRef} className="phone-screen">
      <a
        className="twitter-timeline"
        data-width="340"
        data-height="500"
        href="https://twitter.com/NCPCR_?ref_src=twsrc%5Etfw"
      >
        Tweets by NCPCR
      </a>
    </div>
  );
};

const Home = () => {
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  const newsRef = useRef(null);
  const eventsRef = useRef(null);
  const tendersRef = useRef(null);
  

  useEffect(() => {
    const autoScroll = (ref) => {
      if (ref.current) {
        ref.current.scrollTop += 1;
        if (ref.current.scrollTop + ref.current.clientHeight >= ref.current.scrollHeight) {
          ref.current.scrollTop = 0;
        }
      }
    };

    const interval = setInterval(() => {
      autoScroll(newsRef);
      autoScroll(eventsRef);
      autoScroll(tendersRef);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e, path, key) => {
    e.preventDefault();
    setActiveCard(key);
    setTimeout(() => {
      navigate(path);
    }, 150);
  };

  return (
    <>

    <HeroSection />

    {/* IMAGE SLIDER */}
      {/* IMAGE SLIDER */}
      <section className="image-slider">
        <div className="slider-container">
          <div className="slide-track">
            {[banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8,
              banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8].map((b, i) => (
              <img key={i} src={b} alt={`slide${i}`} />
            ))}
          </div>
        </div>
      </section>
      

      {/* QUICK LINKS */}
      <section className="quick-links">
        <div className="quick-links-bg">
          <h2>Quick Links</h2>
          <div className="quick-links-grid">
            <Link
              to="/report"
              className={`quick-card ${activeCard === "report" ? "active" : ""}`}
              onClick={(e) => handleClick(e, "/report", "report")}
            >
              <h3>Report a Child</h3>
              <p>Inform authorities about a child in need of protection.</p>
            </Link>

            <Link
              to="/child-rights"
              className={`quick-card ${activeCard === "rights" ? "active" : ""}`}
              onClick={(e) => handleClick(e, "/child-rights", "rights")}
            >
              <h3>Child Rights & Laws</h3>
              <p>Learn about child protection acts and safeguards.</p>
            </Link>

            <Link
              to="/helpline"
              className={`quick-card ${activeCard === "helpline" ? "active" : ""}`}
              onClick={(e) => handleClick(e, "/helpline", "helpline")}
            >
              <h3>Child Helpline</h3>
              <p>Emergency assistance — <b>1098</b></p>
            </Link>

            <Link
              to="/volunteer"
              className={`quick-card ${activeCard === "volunteer" ? "active" : ""}`}
              onClick={(e) => handleClick(e, "/volunteer", "volunteer")}
            >
              <h3>Volunteer / NGO</h3>
              <p>Register as a volunteer or NGO.</p>
            </Link>

            <Link
              to="/search-missing-child"
              className={`quick-card ${activeCard === "search" ? "active" : ""}`}
              onClick={(e) => handleClick(e, "/search-missing-child", "search")}
            >
              <h3>Search Missing Child</h3>
              <p>Look for missing children records and stay informed.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* UPDATES SECTION */}
      <section className="updates-section">
        <div className="updates-container">
          {/* Whats New */}
          <div className="update-box">
            <h3>Whats New</h3>
            <div className="scroll-box">
              <ul className="news-scroll" ref={newsRef}>
                <li>Registrar recruitment circular <span>2.3MB PDF | 17-02-26</span></li>
                <li>Consultant engagement notice <span>313KB PDF | 23-01-26</span></li>
                <li>Senior consultant recruitment <span>7.4MB PDF | 14-02-26</span></li>
                <li>Registrar recruitment circular <span>2.3MB PDF | 17-02-26</span></li>
                <li>Consultant engagement notice <span>313KB PDF | 23-01-26</span></li>
                <li>Senior consultant recruitment <span>7.4MB PDF | 14-02-26</span></li>
              </ul>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="update-box">
            <h3>Upcoming Events</h3>
            <div className="scroll-box">
              <ul className="news-scroll" ref={eventsRef}>
                <li>Child Rights Awareness Program <span>Solapur | 25-04-2026</span></li>
                <li>National Child Protection Seminar <span>Delhi | 10-05-2026</span></li>
                <li>NGO Collaboration Workshop <span>Mumbai | 18-05-2026</span></li>
                <li>Child Rights Awareness Program <span>Solapur | 25-04-2026</span></li>
                <li>National Child Protection Seminar <span>Delhi | 10-05-2026</span></li>
                <li>NGO Collaboration Workshop <span>Mumbai | 18-05-2026</span></li>
              </ul>
            </div>
          </div>

          {/* Tenders */}
          <div className="update-box">
            <h3>Tenders</h3>
            <div className="scroll-box">
              <ul className="news-scroll" ref={tendersRef}>
                <li>IT Infrastructure Maintenance <span>1.4MB | 01-03-2026</span></li>
                <li>Child Survey Research Project <span>850KB | 28-02-2026</span></li>
                <li>Website Development Tender <span>600KB | 25-02-2026</span></li>
                <li>IT Infrastructure Maintenance <span>1.4MB | 01-03-2026</span></li>
                <li>Child Survey Research Project <span>850KB | 28-02-2026</span></li>
                <li>Website Development Tender <span>600KB | 25-02-2026</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA SECTION */}
      <section className="social_media">
        <div className="container pb02">
          <h2><span>Bal Vatsalya Marga </span> SOCIAL MEDIA</h2>
          <div className="row">
            {/* Facebook */}
            <div className="col col-md-6 col-lg-4 mb254">
              <div className="phone-frame">
                <div className="phone-screen">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FNCPCR.Official%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="340"
                    height="500"
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    title="Facebook Page"
                  />
                </div>
              </div>
            </div>

            {/* Twitter */}
            <div className="col col-md-6 col-lg-4 mb254">
              <div className="phone-frame">
                <div className="phone-screen">
                  <a
                    className="twitter-timeline"
                    data-width="340"
                    data-height="500"
                    href="https://twitter.com/NCPCR_?ref_src=twsrc%5Etfw"
                    title="Tweets by NCPCR"
                  >
                    Tweets by NCPCR
                  </a>
                  <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="col col-md-6 col-lg-4 mb254">
              <div className="phone-frame insta">
                <div className="phone-screen">
                  <iframe
                    src="https://www.instagram.com/p/C57rEDwP98K/embed/captioned/"
                    width="340"
                    height="665"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    allowFullScreen={true}
                    title="Instagram Post"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO GALLERY SECTION */}
      <section className="video-gallery">
        <div className="container pb02">
          <h2>
            <span>Bal Vatsalya Marga </span> VIDEO GALLERY
          </h2>

          <div className="video-row">
            {/* Video 1 */}
            <div className="video-box">
              <iframe
                width="340"
                height="200"
                src="https://www.youtube.com/embed/q8Xg3AlBHZc"
                title="Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video 2 */}
            <div className="video-box">
              <iframe
                width="340"
                height="200"
                src="https://www.youtube.com/embed/IqThRIgehYs"
                title="Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video 3 */}
            <div className="video-box">
              <iframe
                width="340"
                height="200"
                src="https://www.youtube.com/embed/CqjWE5h8F4c"
                title="Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-box">
              <iframe
                width="340"
                height="200"
                src="https://www.youtube.com/embed/HCYLdtug8sk"
                title="Video 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-box">
              <iframe
                width="340"
                height="200"
                src="https://www.youtube.com/embed/TafvHxXFzUM"
                title="Video 5"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-box">
              <iframe
                width="340"
                height="200"
                src="https://www.youtube.com/embed/b8vTbI6DDzk"
                title="Video 6"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;