import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ text, type, onClick, style, disabled, ...props }) => {
  return (
    <button
      className={`Button ${type == "outline" ? "Button--outline" : ""}  ${
        disabled ? `Button--disabled` : ""
      } `}
      style={style}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
