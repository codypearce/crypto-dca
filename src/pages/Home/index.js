import React, { Component } from "react";
import "./index.css";

import Header from "./Components/Header";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        <div className="home_body row center-xs middle-xs">Test</div>
      </div>
    );
  }
}

export default Home;
