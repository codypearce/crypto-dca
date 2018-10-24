import React, { Component } from "react";
import "./Show.css";

import Header from "../Home/Header/Header";

class Show extends Component {
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
