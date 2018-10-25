import React, { Component } from "react";
import "./Show.css";

import Header from "../Home/Header/Header";
import queryString from "query-string";
import APIURL from "../../constants/API";

class Show extends Component {
	componentDidMount() {
		const parsed = queryString.parse(this.props.location.search);
		// const coinData = await this.getCoinData();
	}
	async getCoinData() {
		const { startDate, endDate } = this.state;

		const dateString = `?start=${startDate.format(
			"YYYY-MM-DD"
		)}&end=${endDate.format("YYYY-MM-DD")}`;
		const url = `${APIURL}${dateString}`;

		const coinRepsonse = await fetch(url);
		const coinJson = await coinRepsonse.json();
		return coinJson;
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
