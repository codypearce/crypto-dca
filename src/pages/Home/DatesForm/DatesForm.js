import React, { Component } from "react";
import PropTypes from "prop-types";

import "./DatesForm.css";

import moment from "moment";

import ButtonDropdown from "../../../ui/ButtonDropdown/ButtonDropdown";
import TextInput from "../../../ui/TextInput/TextInput";
import DatePicker from "../../../ui/DatePicker/DatePicker";
import Button from "../../../ui/Button/Button";

class DatesForm extends Component {
  static propTypes = {
    history: PropTypes.object
  };

  state = {
    frequency: null,
    amount: null,
    startDate: null,
    endDate: null,
    isValid: false
  };

  _updateAmount = value => {
    this.setState(
      {
        amount: value.target.value
      },
      () => this._isValid()
    );
  };

  _updateFrequency(value) {
    this.setState(
      {
        frequency: value
      },
      () => this._isValid()
    );
  }
  handleChange(value, type) {
    this.setState(
      {
        [type]: value
      },
      () => this._isValid()
    );
  }

  _isValid() {
    const { frequency, amount, startDate, endDate } = this.state;
    const isValid = frequency && amount > 0 && startDate && endDate;

    this.setState({ isValid });
  }

  getFrequencyNumeric() {
    const { frequency } = this.state;
    const frequencyTable = {
      Everyday: 1,
      "Every Other Day": 2,
      "Every Week": 7,
      "Every Two Weeks": 14,
      "Every Month": 30,
      "Every Two Months": 60
    };
    return frequencyTable[frequency];
  }
  buildQuery() {
    const { amount, startDate, endDate } = this.state;
    const frequencyNumeric = this.getFrequencyNumeric();
    const dateString = `?start=${startDate.format(
      "YYYY-MM-DD"
    )}&end=${endDate.format("YYYY-MM-DD")}`;
    return `${dateString}&amount=${amount}&freq=${frequencyNumeric}`;
  }
  async handleSubmit() {
    const query = this.buildQuery();
    this.props.history.push({
      pathname: "/show",
      search: query
    });
  }

  render() {
    const { frequency, amount, startDate, endDate, isValid } = this.state;

    const frequencyTypes = [
      "Everyday",
      "Every Other Day",
      "Every Week",
      "Every Two Weeks",
      "Every Month",
      "Every Two Months"
    ];
    const btcStart = "2009-01-12";
    const coindeskStart = "2010-07-17";

    return (
      <div className="DatesForm">
        <div className="row between-xs DatesForm__row">
          <TextInput onChange={this._updateAmount} value={amount} />
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
            openToDate={moment().subtract(1, "year")}
            minDate={moment(coindeskStart)}
            maxDate={moment().subtract(1, "day")}
            placeholderText="Start Date"
            className="TextInput__input"
            label="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={value => this.handleChange(value, "endDate")}
            minDate={moment(coindeskStart).add(1, "day")}
            maxDate={moment()}
            placeholderText="End Date"
            todayButton={"Today"}
            className="TextInput__input"
            label="End Date"
          />
        </div>
        <div className="row center-xs">
          <Button
            text={"Submit"}
            onClick={() => this.handleSubmit()}
            disabled={!isValid}
          />
        </div>
      </div>
    );
  }
}

export default DatesForm;
