import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Show from "./pages/Show/Show";
import About from "./pages/About/About";

import MountainSVG from "./ui/MountainSVG/MountainSVG";
import CryptoAddress from "./ui/CryptoAddress/CryptoAddress";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div
          style={{
            position: "relative",
            minHeight: "100vh"
          }}
        >
          <Route exact path="/" component={props => <Home {...props} />} />
          <Route exact path="/show" component={props => <Show {...props} />} />
          <Route
            exact
            path="/about"
            component={props => <About {...props} />}
          />
          <MountainSVG />
          <CryptoAddress />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
