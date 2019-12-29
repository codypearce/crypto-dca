import React from "react";
import PropTypes from "prop-types";

export default function GraphError({ error }) {
  return (
    <div style={styles.wrapper}>
      <div className="card" style={styles.card}>
        <div style={styles.header}>Error</div>
        <div style={styles.errorText}>{error}</div>
        <div style={styles.subTitle}>Please try again with valid data</div>
      </div>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none"
  },
  card: {
    padding: 8
  },
  header: {
    fontSize: 48,
    color: "#c0392b"
  },
  errorText: {
    fontSize: 32,
    color: "white",
    marginBottom: 16,
    marginTop: 8,
    maxWidth: 500
  },
  subTitle: {
    fontSize: 24,
    color: "white"
  }
};

GraphError.propTypes = {
  error: PropTypes.string
};
