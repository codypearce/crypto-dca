import React from "react";
import PropTypes from "prop-types";
import "./ButtonDropdown.css";

const ButtonDropdownMenuItem = ({ onClick, menuValue }) => {
  return (
    <div className="dropdown_menu_item" onClick={() => onClick(menuValue)}>
      {menuValue}
    </div>
  );
};

ButtonDropdownMenuItem.propTypes = {
  onClick: PropTypes.func,
  menuValue: PropTypes.string
};

export default ButtonDropdownMenuItem;
