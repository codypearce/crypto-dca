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
          <h1 className="title">BITCOIN DCA</h1>
          <p className="home_text">
            Dollar Cost Averaging is investing the same amount at the same time
            over a period of time. Enter in the values below to see how much you
            would have made using DCA.
          </p>
          <DatesForm />
        </div>
      </div>
    );
  }
}

export default Home;
