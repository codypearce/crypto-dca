import React from "react";
import PropTypes from "prop-types";
import { roundToTwo } from "../../../utils/round";
import { numberWithCommas } from "../../../utils/formatNumbers";

export default function AmountInvested({ totalInvested, durationDisplay }) {
  return (
    <div className="row Show__body__row middle-xs">
      <p className="RowHeading RowHeading--small col-sm-2">Invested</p>
      <h2 className="RowValue RowValue--small ">
        ${numberWithCommas(roundToTwo(totalInvested))}{" "}
        <span style={styles.text}>in</span> {durationDisplay}{" "}
        <span style={styles.text}>months</span>
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

AmountInvested.propTypes = {
  dollarAmountInvested: PropTypes.number,
  durationDisplay: PropTypes.string
};
