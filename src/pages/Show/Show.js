import React, { Component } from "react";
import "./Show.css";

import Header from "../Home/Header/Header";
import queryString from "query-string";
import APIURL from "../../constants/API";

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
	render() {
		const {
			dollarAmountInvested,
			coinAmount,
			dataArr,
			investedValue
		} = this.state;
		return (
			<div className="home">
				<Header />
				<div className="home_body col-xs-12 middle-xs">
					<div className="row">
						<p>Value</p>
						<h2>{investedValue}</h2>
					</div>
					<div className="row">
						<p>Coin</p>
						<h2>{coinAmount}</h2>
					</div>
					<div className="row">
						<p>Dollar</p>
						<h2>{dollarAmountInvested}</h2>
					</div>
				</div>
			</div>
		);
	}
}

export default Show;
