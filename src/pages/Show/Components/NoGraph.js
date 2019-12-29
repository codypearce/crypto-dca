import React from "react";

export default function NoGraph() {
  return (
    <div style={styles.wrapper}>
      No graph available. Since the frequency is larger than the number of days
      between the start and end date, there is only one investment.
    </div>
  );
}

const styles = {
  wrapper: {
    fontSize: 18,
    color: "white",
    lineHeight: 1.5,
    maxWidth: 500
  }
};
