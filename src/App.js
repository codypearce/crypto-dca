import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Show from "./pages/Show/Show";

import MountainSVG from "./ui/MountainSVG/MountainSVG";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%"
          }}
        >
          <Route exact path="/" component={props => <Home {...props} />} />
          <Route exact path="/show" component={props => <Show {...props} />} />
          <MountainSVG />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
