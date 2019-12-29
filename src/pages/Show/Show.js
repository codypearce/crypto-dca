import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Show.css";

import Header from "../Home/Header/Header";
import queryString from "query-string";
import APIURL from "../../constants/API";
import { coinTypes } from "../../constants/dates";
import moment from "moment";
import { AreaChart, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { coindeskStart } from "../../constants/dates";

import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon
} from "react-share";
import BackButton from "./Components/BackButton";
import GraphError from "./Components/GraphError";

class Show extends Component {
  state = {
    params: null,
    loading: true,
    error: false
  };

  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);

    this.validateValues(params);
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  validateValues(params) {
    const { amount, end, start, freq, coinType } = params;
    let error = null;
    let startDate = moment(start);
    let endDate = moment(end);
    let duration = this.getDuration(startDate, endDate);

    error = this._validateAmount(amount) || error;
    error = this._validateFrequency(freq) || error;
    error = this._validateStartDate(startDate) || error;
    error = this._validateEndDate(endDate) || error;
    error = this._validateCoinType(coinType) || error;
    error = this._validateDatesOverlap(duration) || error;

    if (error && error.length > 0) {
      this.setState({ error });
      return;
    }

    let durationDisplay = duration;
    if (duration > 30) {
      durationDisplay = endDate.diff(startDate, "months");
    }

    this.setState({
      ...params,
      loading: true,
      duration,
      durationDisplay
    });
    this.getCoinData(start, end, coinType);
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

  _validateStartDate(startDate) {
    let error = null;
    if (!startDate.isValid()) error = "Start Date is not a valid date";

    if (startDate.isBefore(moment(coindeskStart)))
      error = "Start Date cannot be before 2009-01-12";

    if (startDate.isAfter(moment().subtract(1, "day")))
      error = "Start Date cannot be after yesterday";

    return error;
  }

  _validateEndDate(endDate) {
    let error = null;

    if (!endDate.isValid()) {
      error = "End Date is not a valid date";
    }

    if (endDate.isBefore(moment(coindeskStart).add(1, "day")))
      error = "End Date cannot be before 2009-01-13";

    if (endDate.isAfter(moment())) error = "End Date cannot be after today";

    return error;
  }

  _validateDatesOverlap(duration) {
    if (duration < 1) return "The start date has to be before the end date";
  }

  _validateFreqOverDuration(freq, duration) {
    return freq >= duration;
  }

  _validateCoinType(coinType) {
    if (!coinType) return "Must have a coin type";

    if (!coinTypes.find(item => item == coinType))
      return "Coin is currently not supported";
  }

  getDuration(a, b) {
    let duration = b.diff(a, "days");

    return duration;
  }

  getGrowth() {
    const { dollarAmountInvested, investedValue } = this.state;
    const value =
      ((investedValue - dollarAmountInvested) / dollarAmountInvested) * 100;
    return this.roundToTwo(value);
  }

  async getCoinData(startDate, endDate, coinType) {
    const startDateUnix = moment(startDate).format("X");
    const endDateUnix = moment(endDate).format("X");

    const chartType = "market_chart";
    const range = `range?vs_currency=usd&from=${startDateUnix}&to=${endDateUnix}`;

    const url = `${APIURL}/coins/${coinType &&
      coinType.toLowerCase()}/${chartType}/${range}`;

    const coinResponse = await fetch(url);
    if (coinResponse && coinResponse.status && coinResponse.status == 200) {
      const coinJson = await coinResponse.json();

      if (coinJson && coinJson.prices && coinJson.prices.length > 0) {
        let coinDataArray = [];
        coinJson.prices.forEach(item => {
          coinDataArray.push({
            date: moment(item[0]).format("MM/DD/YYYY"),
            value: item[1]
          });
        });

        this.setState({ coinData: coinDataArray }, () => {
          this.initializeData();
        });
      } else {
        this.setState({ error: "There was a problem grabbing price data" });
      }
    } else {
      this.setState({ error: "There was a problem with the API" });
    }
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
      durationDisplay,
      duration,
      freq
    } = this.state;

    return (
      <div className="Show__body  col-xs-12 middle-xs ">
        <div className="card Show__card">
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
              <span style={{ color: "white", fontSize: 18 }}>in</span>{" "}
              {durationDisplay}{" "}
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
          <div style={{ width: "100%" }}>
            {this._validateFreqOverDuration(freq, duration) ? (
              <div
                style={{
                  fontSize: 18,
                  color: "white",
                  lineHeight: 1.5,
                  maxWidth: 500
                }}
              >
                No graph available. Since the frequency is larger than the
                number of days between the start and end date, there is only one
                investment.
              </div>
            ) : (
              <ResponsiveContainer height={250}>
                <AreaChart data={dataArr}>
                  <XAxis hide dataKey={"date"} />
                  <Tooltip
                    contentStyle={{ background: "#444444", border: "none" }}
                    labelStyle={{ color: "#ebebeb" }}
                    labelFormatter={(value, name, props) => `Date : ${value}`}
                    formatter={(value, name, props) =>
                      `${this.roundToTwo(value)}`
                    }
                  />
                  <Area
                    type="linear"
                    dataKey="Total"
                    stroke="none"
                    fillOpacity={1}
                    fill="#f7931a"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        {this._validateFreqOverDuration(freq, duration) ? (
          ""
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={28} />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={28} />
            </TwitterShareButton>
            <RedditShareButton url={window.location.href}>
              <RedditIcon size={28} />
            </RedditShareButton>
          </div>
        )}
      </div>
    );
  }
  render() {
    const { loading, error } = this.state;

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
      content = <GraphError error={error} />;
    }

    return (
      <div className="Show">
        <Header />
        <BackButton handleSubmit={() => this.handleSubmit()} />

        {content}
      </div>
    );
  }
}

export default Show;
