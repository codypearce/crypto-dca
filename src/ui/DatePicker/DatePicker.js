import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as ReactDatePicker } from "react-datepicker";

import "./DatePicker.css";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

export default class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    selected: PropTypes.string,
    onChange: PropTypes.func,
    openToDate: PropTypes.func,
    minDate: PropTypes.func,
    maxDate: PropTypes.func,
    placeholderText: PropTypes.string,
    label: PropTypes.string,
    todayButton: PropTypes.string
  };
  state = {
    isOpen: false
  };

  render() {
    const { isOpen } = this.state;
    const {
      value,
      selected,
      onChange,
      openToDate,
      minDate,
      maxDate,
      placeholderText,
      label,
      todayButton
    } = this.props;
    return (
      <div className="TextInput">
        <label className="TextInput__label">{label}</label>
        <ReactDatePicker
          selected={selected}
          onChange={onChange}
          showMonthDropdown
          showYearDropdown
          openToDate={openToDate}
          minDate={minDate}
          maxDate={maxDate}
          todayButton={todayButton}
          placeholderText={placeholderText}
          className="TextInput__input"
        />
      </div>
    );
  }
}
