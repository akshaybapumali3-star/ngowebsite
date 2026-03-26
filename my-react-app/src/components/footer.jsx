import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

     {/* MAIN FOOTER */}
<div className="footer-content">

  {/* BRAND SECTION */}
  <div className="footer-brand">

    <img
      src="/images/logo.png"
      alt="Bal Vatsalya Marga Logo"
      className="footer-logo"
    />

    <h2 className="footer-title">Bal Vatsalya Marga</h2>

    <p className="footer-text">
      Committed to Child Welfare & Growth. <br />
      Protecting, nurturing and empowering every child.
    </p>

    <p className="footer-text footer-contact">
      📍 India <br />
      ☎ Helpline: <strong>1098</strong>
    </p>

  </div>


        {/* CENTER : SITE LINKS */}
        <div className="footer-section">
          <h3>Our Sections</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/report">Report Child</a></li>
            <li><a href="/search">Search Child</a></li>
            <li><a href="/volunteer">Volunteer</a></li>
            <li><a href="/mission">Mission</a></li>
          </ul>
        </div>

        {/* RIGHT : CONTACT */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p className="footer-text">📧 support@balvatsalyamarga.org</p>
          <p className="footer-text">📞 +91 00000 00000</p>

          <div className="footer-social">
            <a href="#">f</a>
            <a href="#">t</a>
            <a href="#">▶</a>
            <a href="#">📸</a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © 2026 Bal Vatsalya Marga | All Rights Reserved
      </div>

    </footer>
  );
};

export default Footer;
