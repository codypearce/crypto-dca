import React from "react";
import PropTypes from "prop-types";
import { roundToTwo, roundToFive } from "../../../utils/round";
import { numberWithCommas } from "../../../utils/formatNumbers";

export default function Total({ investedValue, coinAmount }) {
  return (
    <div className="row Show__body__row middle-xs">
      <p className="RowHeading col-sm-2 ">Total</p>
      <h2 className="RowValue">
        ${numberWithCommas(roundToTwo(investedValue))}{" "}
        <span style={{ color: "white" }}>/</span> {roundToFive(coinAmount)}
      </h2>
    </div>
  );
}

Total.propTypes = {
  investedValue: PropTypes.number,
  coinAmount: PropTypes.number
};
