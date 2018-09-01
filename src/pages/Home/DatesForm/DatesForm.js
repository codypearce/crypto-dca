import React, { Component } from "react";
import "./DatesForm.css";
import DatePicker from "react-datepicker";

import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

import ButtonDropdown from "../../../ui/ButtonDropdown/ButtonDropdown";

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

  render() {
    const { frequency, startDate, endDate } = this.state;

    const frequencyTypes = [
      "Everyday",
      "Every Other Day",
      "Every Week",
      "Every Two Weeks",
      "Every Month"
    ];

    return (
      <div>
        <h1>Bitcoin DCA</h1>
        <ButtonDropdown
          value={frequency}
          onChange={value => this._updateFrequency(value)}
          menuItems={frequencyTypes}
        />
        <input
          placeholder="How much?"
          type="number"
          onChange={e => this._updateValue("amount", e)}
        />
        <DatePicker selected={startDate} onChange={this.handleChange} />
        <DatePicker selected={endDate} onChange={this.handleChange} />
      </div>
    );
  }
}

export default DatesForm;
