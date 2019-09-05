import React, { Component } from "react";
import PropTypes from "prop-types";

import "./DatesForm.css";

import moment from "moment";
import {
  frequencyTypes,
  btcStart,
  coindeskStart,
  coinTypes
} from "../../../constants/dates";

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
    isValid: false,
    coinType: "Bitcoin"
  };

  _updateAmount = value => {
    const amount = value.target.value;

    if (!Number.isInteger(Number(amount))) return;
    if (amount < 0) return;

    this.setState(
      {
        amount
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

  _updateCoinType(value) {
    this.setState(
      {
        coinType: value
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
    const { amount, startDate, endDate, coinType } = this.state;
    const frequencyNumeric = this.getFrequencyNumeric();
    const dateString = `?start=${startDate.format(
      "YYYY-MM-DD"
    )}&end=${endDate.format("YYYY-MM-DD")}`;
    return `${dateString}&amount=${amount}&freq=${frequencyNumeric}&coinType=${coinType}`;
  }
  async handleSubmit() {
    const query = this.buildQuery();
    this.props.history.push({
      pathname: "/show",
      search: query
    });
  }

  render() {
    const {
      frequency,
      amount,
      startDate,
      endDate,
      isValid,
      coinType
    } = this.state;

    return (
      <div className="DatesForm">
        <div className="row DatesForm__row DatesForm__row--coinType">
          <ButtonDropdown
            value={coinType}
            onChange={value => this._updateCoinType(value)}
            menuItems={coinTypes}
            label={"Coin Type"}
          />
        </div>

        <div className="row between-xs DatesForm__row">
          <TextInput onChange={this._updateAmount} value={amount} />
          <ButtonDropdown
            value={frequency}
            onChange={value => this._updateFrequency(value)}
            menuItems={frequencyTypes}
            label={"How Frequent"}
            placeholder={"Frequency"}
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
