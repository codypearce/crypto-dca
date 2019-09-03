import React, { Component } from "react";
import "./Home.css";

import Header from "./Header/Header";
import DatesForm from "./DatesForm/DatesForm";
import MountainSVG from "../../ui/MountainSVG/MountainSVG";
class Home extends Component {
  render() {
    const { width, height } = this.props;

    return (
      <div className="home">
        <Header />
        <MountainSVG windowWidth={width} windowHeight={height} />
        <div className="home_body col-xs-12 middle-xs">
          <div className="card">
            <h1 className="title">CRYPTO DCA</h1>
            <p className="home_text">
              Dollar Cost Averaging is investing the same amount at the same
              time over a period of time. Enter in the values below to see how
              much you would have made using DCA.
            </p>
            <DatesForm history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
