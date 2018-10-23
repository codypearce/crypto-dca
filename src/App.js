import React, { Component } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		);
	}
}

export default App;
