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
      isOpen: state ? state : !this.state.isOpen
    });
  }

  _updateValue(value) {
    this.props.onChange(value);
    this._toggleMenu(false);
  }

  render() {
    const { isOpen } = this.state;
    const { value } = this.props;
    return (
      <div className="dropdown">
        <label className="dropdown__label">How Frequent</label>
        <button
          onClick={() => this._toggleMenu()}
          className="dropdown_button pointer"
        >
          {value ? value : "Frequency"}
        </button>
        <div className={`dropdown_menu ${isOpen ? "dropdown_menu--open" : ""}`}>
          <ButtonDropdownMenuItem
            onClick={() => this._updateValue("Everyday")}
            menuValue={"Everyday"}
          />
        </div>
      </div>
    );
  }
}
