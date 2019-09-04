import React, { Component } from "react";
import "./Home.css";

import Header from "./Header/Header";
import DatesForm from "./DatesForm/DatesForm";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header />

        <div className="home_body col-xs-12 middle-xs">
          <div className="card">
            <h1 className="title">CRYPTO DCA</h1>
            <p className="home_text">
              Dollar Cost Averaging is investing the same amount at the same
              time over a period of time. Enter values below see gains from DCA
              over time.
            </p>
            <DatesForm history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
