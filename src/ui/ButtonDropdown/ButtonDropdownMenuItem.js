import React from "react";
import "./ButtonDropdown.css";

const ButtonDropdownMenuItem = ({ onClick, menuValue }) => {
  return (
    <div className="dropdown_menu_item" onClick={() => onClick(menuValue)}>
      {menuValue}
    </div>
  );
};

export default ButtonDropdownMenuItem;
