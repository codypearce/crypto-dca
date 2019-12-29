import React, { Component } from "react";
import "./About.css";

import Header from "../../ui//Header/Header";

class About extends Component {
  render() {
    return (
      <div className="About">
        <Header />

        <div className="About__body col-xs-12 middle-xs">
          <div className="card">
            <h1 className="title">About</h1>
            <p className="home_text">
              Dollar Cost Averaging is investing the same dollar amount over
              regular intervals to reduce short-term volatility. Crypto DCA is a
              simple tool to see how much you would have made by DCAing crypt
              over different type periods. This does not contain investing
              advice, it is simply a tool.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
