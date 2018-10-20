import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ text, onClick }) => {
  return (
    <button className="Button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
