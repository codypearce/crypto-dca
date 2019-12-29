import React from "react";

export default function Loader() {
  return (
    <div style={styles.wrapper}>
      <div className="loader">Loading</div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none"
  }
};
