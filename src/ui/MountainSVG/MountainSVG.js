import React from "react";

function MountainSVG({ windowWidth, windowHeight }) {
  return (
    <svg
      viewBox="0 0 633 534"
      width={633}
      height={534}
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: -1
      }}
    >
      <g>
        <path
          d=" M 0 534 L 393 315 L 596 0 L 633 36 L 633 534 L 0 534 Z "
          fill="rgb(247,147,26)"
        />
      </g>
    </svg>
  );
}

export default MountainSVG;
