import React, { Component } from "react";

import ButtonDropdownMenuItem from "./ButtonDropdownMenuItem";

import "./index.css";

export default class ButtonDropdown extends Component {
  state = {
    isOpen: false,
    selected: null
  };

  _toggleMenu(state) {
    this.setState({
      isOpen: state ? state : !this.state.isOpen
    });
  }

  render() {
    const { isOpen, selected } = this.state;
    return (
      <div className="dropdown">
        <button onClick={() => this._toggleMenu()}>
          {selected ? selected : "Frequency"}
        </button>
        <div className={`dropdown_menu ${isOpen ? "dropdown_menu--open" : ""}`}>
          <ButtonDropdownMenuItem
            onClick={this._updateValue}
            menuValue={"Everyday"}
          />
        </div>
      </div>
    );
  }
}
