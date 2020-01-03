import React from "react";
import PropTypes from "prop-types";
import { AreaChart, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { roundToTwo } from "../../../utils/round";

export default function Graph({ dataArr }) {
  console.log(dataArr);
  return (
    <ResponsiveContainer height={250}>
      <AreaChart data={dataArr}>
        <XAxis hide dataKey={"date"} />
        <Tooltip
          contentStyle={styles.tooltipWrapper}
          labelStyle={styles.tooltip}
          labelFormatter={value => `Date : ${value}`}
          formatter={value => `${roundToTwo(value)}`}
        />
        <Area
          type="linear"
          dataKey="Total"
          stroke="none"
          fillOpacity={1}
          fill="#f7931a"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const styles = {
  tooltipWrapper: {
    background: "#444444",
    border: "none"
  },
  tooltip: {
    color: "#ebebeb"
  }
};

Graph.propTypes = {
  dataArr: PropTypes.array
};
