import React, { Component } from "react";
import "./Show.css";

import Header from "../Home/Header/Header";
import queryString from "query-string";
import APIURL from "../../constants/API";
import Button from "../../ui/Button/Button";

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
      investedValue
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

        <div className="Show__body col-xs-12 middle-xs">
          <div className="row">
            <p className="RowHeading col-xs-3">Total</p>
            <h2 className="RowValue">{investedValue}</h2>
          </div>
          <div className="row">
            <p className="RowHeading">Coin</p>
            <h2 className="RowValue">{coinAmount}</h2>
          </div>
          <div className="row">
            <p className="RowHeading">Invested</p>
            <h2 className="RowValue">{dollarAmountInvested}</h2>
          </div>
          <div className="row">
            <p className="RowHeading">Gained</p>
            <h2 className="RowValue">{dollarAmountInvested}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
