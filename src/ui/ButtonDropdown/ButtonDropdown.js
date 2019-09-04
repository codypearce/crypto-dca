import React, { Component } from "react";
import PropTypes from "prop-types";

import ButtonDropdownMenuItem from "./ButtonDropdownMenuItem";

import "./ButtonDropdown.css";

export default class ButtonDropdown extends Component {
  static propTypes = {
    menuItems: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {
    isOpen: false
  };

  _toggleMenu(state) {
    this.setState({
      isOpen: state
    });
  }

  _updateValue(value) {
    this.props.onChange(value);
    this._toggleMenu(false);
  }

  render() {
    const { isOpen } = this.state;
    const { value, menuItems, label, placeholder } = this.props;
    return (
      <div
        className="dropdown"
        onBlur={() => this._toggleMenu(false)}
        onFocus={() => this._toggleMenu(true)}
        tabIndex="0"
      >
        <label className="dropdown__label">{label}</label>
        <button
          className={`dropdown_button pointer ${
            !value ? "dropdown_button--noValue" : ""
          }`}
        >
          {value ? value : placeholder}
        </button>
        <div className={`dropdown_menu ${isOpen ? "dropdown_menu--open" : ""}`}>
          {menuItems.map((item, index) => {
            return (
              <ButtonDropdownMenuItem
                key={index}
                onClick={() => this._updateValue(item)}
                menuValue={item}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
