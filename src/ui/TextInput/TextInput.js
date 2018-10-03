import React, { Component } from "react";
import PropTypes from "prop-types";

import "./TextInput.css";

export default class TextInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  render() {
    const { isOpen } = this.state;
    const { value } = this.props;
    return (
      <div className="TextInput">
        <label className="TextInput__label">How Much</label>
        <input
          placeholder="How much?"
          type="number"
          onChange={e => this._updateValue("amount", e)}
          className="TextInput__input"
        />
      </div>
    );
  }
}
