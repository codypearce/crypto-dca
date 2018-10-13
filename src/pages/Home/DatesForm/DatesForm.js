import React, { Component } from "react";
import "./DatesForm.css";

import moment from "moment";

import ButtonDropdown from "../../../ui/ButtonDropdown/ButtonDropdown";
import TextInput from "../../../ui/TextInput/TextInput";
import DatePicker from "../../../ui/DatePicker/DatePicker";

class DatesForm extends Component {
  state = {
    frequency: null,
    amount: null,
    startDate: null,
    endDate: null
  };

  _updateValue(type, value) {
    this.setState({
      [type]: value.target.value
    });
  }

  _updateFrequency(value) {
    this.setState({
      frequency: value
    });
  }
  handleChange(value, type) {
    this.setState({
      [type]: value
    });
  }

  render() {
    const { frequency, startDate, endDate } = this.state;

    const frequencyTypes = [
      "Everyday",
      "Every Other Day",
      "Every Week",
      "Every Two Weeks",
      "Every Month",
      "Every Two Months"
    ];

    return (
      <div className="DatesForm">
        <div className="row between-xs DatesForm__row">
          <TextInput />
          <ButtonDropdown
            value={frequency}
            onChange={value => this._updateFrequency(value)}
            menuItems={frequencyTypes}
          />
        </div>
        <div className="row between-xs DatesForm__row">
          <DatePicker
            selected={startDate}
            onChange={value => this.handleChange(value, "startDate")}
            openToDate={moment("2009-01-12")}
            minDate={moment("2009-01-12")}
            maxDate={moment().subtract(1, "day")}
            placeholderText="Start Date"
            className="TextInput__input"
            label="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={value => this.handleChange(value, "endDate")}
            minDate={moment("2009-01-12").add(1, "day")}
            maxDate={moment()}
            placeholderText="End Date"
            todayButton={"Today"}
            className="TextInput__input"
            label="End Date"
          />
        </div>
      </div>
    );
  }
}

export default DatesForm;
