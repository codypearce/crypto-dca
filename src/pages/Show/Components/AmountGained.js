import React from "react";
import PropTypes from "prop-types";
import { roundToTwo } from "../../../utils/round";
import { numberWithCommas } from "../../../utils/formatNumbers";

export default function AmountGained({ dollarAmountInvested, investedValue }) {
  const percentGained =
    ((investedValue - dollarAmountInvested) / dollarAmountInvested) * 100;

  return (
    <div className="row Show__body__row middle-xs">
      <p className="RowHeading RowHeading--small col-sm-2">Gained</p>
      <h2 className="RowValue RowValue--small ">
        ${numberWithCommas(roundToTwo(investedValue - dollarAmountInvested))}{" "}
        <span style={styles.text}>for</span> {roundToTwo(percentGained)}%{" "}
        <span style={styles.text}>growth</span>
      </h2>
    </div>
  );
}

const styles = {
  text: {
    color: "white",
    fontSize: 18
  }
};

AmountGained.propTypes = {
  dollarAmountInvested: PropTypes.number,
  investedValue: PropTypes.string
};
