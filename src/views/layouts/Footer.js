import React from "react";
import "./Footer.scss";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
        <hr />
        <Link className="linkFoot" to="/cgu">CGU</Link>
        <Link className="linkFoot" to="/cgv">CGV</Link>
    </footer>
  );
}

export default Footer;
