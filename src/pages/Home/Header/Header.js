import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="row start-xs middle-xs header">
      <div className="row">
        <a href="/" className="link header_link">
          Home
        </a>
        <a href="/" className="link header_link">
          About
        </a>
      </div>

      <h1 className="header_title">CRYPTO DCA</h1>
    </header>
  );
};

export default Header;
