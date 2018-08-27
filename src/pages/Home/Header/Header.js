import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="row between-xs middle-xs header">
      <h3>Crypto DCA</h3>
      <div className="row">
        <a href="/" className="link header_link">
          Home
        </a>
        <a href="/about" className="link header_link">
          About
        </a>
      </div>
    </header>
  );
};

export default Header;
