import React, { Component } from "react";
import "./Show.css";

import Header from "../Home/Header/Header";
import queryString from "query-string";
import APIURL from "../../constants/API";
import Button from "../../ui/Button/Button";
import moment from "moment";

class Show extends Component {
  state = {
    params: null
  };
  componentDidMount() {
    const params = queryString.parse(this.props.location.search);

    this.setState({
      ...params
    });
    this.getCoinData(params.start, params.end);
    this.getDuration(params.start, params.end);
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
        investedValue: coinAmount * coinData[i].value,
        date: coinData[i].date
      });
    }
    this.setState({
      dollarAmountInvested,
      coinAmount,
      dataArr,
      investedValue: coinAmount * coinData[coinData.length - 1].value
    });
  }

  roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }

  roundToFive(num) {
    return +(Math.round(num + "e+5") + "e-5");
  }

  handleSubmit() {
    this.props.history.push({
      pathname: "/"
    });
  }
  render() {
    const {
      dollarAmountInvested,
      coinAmount,
      dataArr,
      investedValue,
      duration
    } = this.state;

    return (
      <div className="Show">
        <Header />
        <Button
          type="outline"
          style={{ marginTop: 70, marginLeft: 24, position: "absolute" }}
          text={"Back"}
          onClick={() => this.handleSubmit()}
        />

        <div className="Show__body col-xs-10  ">
          <div className="row Show__body__row middle-xs">
            <p className="RowHeading col-sm-2 ">Total</p>
            <h2 className="RowValue">
              ${this.roundToTwo(investedValue)}{" "}
              <span style={{ color: "white" }}>/</span>{" "}
              {this.roundToFive(coinAmount)}
            </h2>
          </div>
          <div className="row Show__body__row middle-xs">
            <p className="RowHeading RowHeading--small col-sm-2">Invested</p>
            <h2 className="RowValue RowValue--small ">
              ${this.roundToTwo(dollarAmountInvested)}{" "}
              <span style={{ color: "white", fontSize: 18 }}>in</span>{" "}
              {duration}{" "}
              <span style={{ color: "white", fontSize: 18 }}>months</span>
            </h2>
          </div>

          <div className="row Show__body__row middle-xs">
            <p className="RowHeading RowHeading--small col-sm-2">Gained</p>
            <h2 className="RowValue RowValue--small ">
              ${this.roundToTwo(investedValue - dollarAmountInvested)}{" "}
              <span style={{ color: "white", fontSize: 18 }}>for</span>{" "}
              {this.getGrowth()}%{" "}
              <span style={{ color: "white", fontSize: 18 }}>growth</span>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
