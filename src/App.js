import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Show from "./pages/Show/Show";

import ReactResizeDetector from "react-resize-detector";
import MountainSVG from "./ui/MountainSVG/MountainSVG";
class App extends Component {
  state = {
    width: 1080
  };

  handleLayout = event => {
    const width = event.nativeEvent.layout.width;
    this.setState({ width });
  };
  onResize = (width, height) => {
    this.setState({ width, height });
  };
  render() {
    const { width, height } = this.state;
    return (
      <BrowserRouter>
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%"
          }}
        >
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={this.onResize}
          >
            <Route
              exact
              path="/"
              component={() => <Home width={width} height={height} />}
            />
            <Route
              exact
              path="/show"
              component={() => <Show width={width} height={height} />}
            />
            <MountainSVG />
          </ReactResizeDetector>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
