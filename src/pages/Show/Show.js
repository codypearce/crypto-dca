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
		// console.log(this.state);
		// console.log(coinData.length, freq);
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
		console.log(dollarAmountInvested, coinAmount, dataArr);
	}
	render() {
		return (
			<div className="home">
				<Header />
				<div className="home_body col-xs-12 middle-xs">
					<h1 className="title">Show Page</h1>
					<p className="home_text" />
				</div>
			</div>
		);
	}
}

export default Show;
