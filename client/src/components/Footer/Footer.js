import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className= "footer">
  <p className="footertext"> Copyright <span className="copyright">&copy;  </span>{new Date().getFullYear()}
  &nbsp;FREENICA
    </p>
  </footer>
);

export default Footer;