import React, { Component } from "react";
import "./index.css";

const ButtonDropdownMenuItem = (onClick, menuValue) => {
  return (
    <div className="dropdown_menu_item" onClick={() => onClick(menuValue)}>
      {menuValue}
    </div>
  );
};

export default ButtonDropdownMenuItem;
