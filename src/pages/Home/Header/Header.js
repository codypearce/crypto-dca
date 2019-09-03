import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="row start-xs middle-xs header">
      <div className="row">
        <Link to="/" className="link header_link">
          Home
        </Link>
        <Link to="/about" className="link header_link">
          About
        </Link>
      </div>

      <h1 className="header_title">CRYPTO DCA</h1>
    </header>
  );
};

export default Header;
