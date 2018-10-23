import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Show from "./pages/Show/Show";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/show" component={Show} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
