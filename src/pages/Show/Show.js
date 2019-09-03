import React, { Component } from "react";
import "./Show.css";

import Header from "../Home/Header/Header";
import queryString from "query-string";
import APIURL from "../../constants/API";
import Button from "../../ui/Button/Button";
import moment from "moment";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area
} from "recharts";
import { frequencyTypes, btcStart, coindeskStart } from "../../constants/dates";

class Show extends Component {
  state = {
    params: null,
    loading: true,
    error: false
  };
  componentDidMount() {
    const params = queryString.parse(this.props.location.search);

    this.validateValues(params);
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  validateValues(params) {
    const { amount, end, start, freq } = params;
    let error = null;
    error = this._validateAmount(amount);
    error = this._validateFrequency(freq);

    let startDate = moment(start);
    let endDate = moment(end);

    if (!startDate.isValid()) {
      error = "Start Date is not a valid date";
    }
    if (!endDate.isValid()) {
      error = "End Date is not a valid date";
    }

    if (startDate.isBefore(moment(coindeskStart))) {
      error = "Start Date cannot be before 2009-01-12 due to API limitations";
    }

    if (startDate.isAfter(moment().subtract(1, "day"))) {
      error = "Start Date cannot be after yesterday";
    }

    if (endDate.isBefore(moment(coindeskStart).add(1, "day"))) {
      error = "End Date cannot be before 2009-01-13 due to API limitations";
    }

    if (endDate.isAfter(moment())) {
      error = "End Date cannot be after today";
    }

    if (error && error.length > 0) {
      this.setState({ error });
      return;
    }

    this.setState({
      ...params,
      loading: true
    });
    this.getCoinData(start, end);
    this.getDuration(start, end);
  }

  _validateAmount(amount) {
    let error = null;
    if (Number.isNaN(Number(amount))) error = "Amount must be a number";
    if (amount < 1) error = "Amount cannot be less than 1";
    return error;
  }

  _validateFrequency(freq) {
    let error = null;
    if (freq < 1) error = "Frequency cannot be less than 1";

    if (!Number.isInteger(Number(freq))) error = "Frequency must be an integer";
    return error;
  }

  getDuration(start, end) {
    let a = moment(start);
    let b = moment(end);
    let duration = b.diff(a, "days");
    if (duration > 30) {
      duration = b.diff(a, "months");
    }
    this.setState({ duration });
  }

  getGrowth() {
    const { dollarAmountInvested, investedValue } = this.state;
    const value =
      ((investedValue - dollarAmountInvested) / dollarAmountInvested) * 100;
    return this.roundToTwo(value);
  }

  async getCoinData(startDate, endDate) {
    const dateString = `?start=${startDate}&end=${endDate}`;
    const url = `${APIURL}${dateString}`;

    const coinRepsonse = await fetch(url);
    const coinJson = await coinRepsonse.json();
    let coinDataArray = [];
    for (const key of Object.keys(coinJson.bpi)) {
      coinDataArray.push({
        date: key,
        value: coinJson.bpi[key]
      });
    }
    this.setState({ coinData: coinDataArray }, () => {
      this.initializeData();
    });
  }
  initializeData() {
    const { amount, freq, coinData } = this.state;
    let dollarAmountInvested = 0;
    let coinAmount = 0;

    let dataArr = [];
    for (let i = 0; i < coinData.length; i += Number(freq)) {
      dollarAmountInvested += Number(amount);
      coinAmount += amount / coinData[i].value;

      dataArr.push({
        dollarAmountInvested,
        coinAmount,
        coinValue: coinData[i].value,
        Total: coinAmount * coinData[i].value,
        date: coinData[i].date
      });
    }
    this.setState({
      dollarAmountInvested,
      coinAmount,
      dataArr,
      investedValue: coinAmount * coinData[coinData.length - 1].value
    });
    this.timeout = setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }

  roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }

  roundToFive(num) {
    return +(Math.round(num + "e+5") + "e-5");
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  handleSubmit() {
    this.props.history.push({
      pathname: "/"
    });
  }

  _renderContent() {
    const {
      dollarAmountInvested,
      coinAmount,
      dataArr,
      investedValue,
      duration
    } = this.state;
    return (
      <div className="Show__body   ">
        <div className="row Show__body__row middle-xs">
          <p className="RowHeading col-sm-2 ">Total</p>
          <h2 className="RowValue">
            ${this.numberWithCommas(this.roundToTwo(investedValue))}{" "}
            <span style={{ color: "white" }}>/</span>{" "}
            {this.roundToFive(coinAmount)}
          </h2>
        </div>
        <div className="row Show__body__row middle-xs">
          <p className="RowHeading RowHeading--small col-sm-2">Invested</p>
          <h2 className="RowValue RowValue--small ">
            ${this.numberWithCommas(this.roundToTwo(dollarAmountInvested))}{" "}
            <span style={{ color: "white", fontSize: 18 }}>in</span> {duration}{" "}
            <span style={{ color: "white", fontSize: 18 }}>months</span>
          </h2>
        </div>

        <div className="row Show__body__row middle-xs">
          <p className="RowHeading RowHeading--small col-sm-2">Gained</p>
          <h2 className="RowValue RowValue--small ">
            $
            {this.numberWithCommas(
              this.roundToTwo(investedValue - dollarAmountInvested)
            )}{" "}
            <span style={{ color: "white", fontSize: 18 }}>for</span>{" "}
            {this.getGrowth()}%{" "}
            <span style={{ color: "white", fontSize: 18 }}>growth</span>
          </h2>
        </div>
        <div className=" ">
          <AreaChart width={980} height={250} data={dataArr}>
            <XAxis hide dataKey={"date"} />
            <Tooltip
              contentStyle={{ background: "#444444", border: "none" }}
              labelStyle={{ color: "#ebebeb" }}
              labelFormatter={(value, name, props) => `Date : ${value}`}
              formatter={(value, name, props) => `${value}`}
            />
            <Area
              type="linear"
              dataKey="Total"
              stroke="none"
              fillOpacity={1}
              fill="#f7931a"
            />
          </AreaChart>
        </div>
      </div>
    );
  }
  render() {
    const {
      dollarAmountInvested,
      coinAmount,
      dataArr,
      investedValue,
      duration,
      loading,
      error
    } = this.state;

    let content = !loading ? (
      this._renderContent()
    ) : (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none"
        }}
      >
        <div className="loader">Loading</div>
      </div>
    );

    if (error) {
      content = (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none"
          }}
        >
          <div style={{ fontSize: 48, color: "#c0392b" }}>Error</div>
          <div
            style={{
              fontSize: 32,
              color: "white",
              marginBottom: 16,
              marginTop: 8
            }}
          >
            {error}.
          </div>
          <div style={{ fontSize: 24, color: "white" }}>
            Please try again with valid data
          </div>
        </div>
      );
    }

    return (
      <div className="Show">
        <Header />
        <Button
          type="outline"
          style={{ marginTop: 70, marginLeft: 24, position: "absolute" }}
          text={"Back"}
          onClick={() => this.handleSubmit()}
        />

        {content}
      </div>
    );
  }
}

export default Show;
