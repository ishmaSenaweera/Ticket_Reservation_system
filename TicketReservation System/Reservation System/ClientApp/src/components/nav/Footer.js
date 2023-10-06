import React from "react";
import "./nav.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foter">
      <div>
        <p className="copyright">© Copyright {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
