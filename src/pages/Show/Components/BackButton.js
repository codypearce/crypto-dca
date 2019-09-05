import React from "react";
import { useMediaQuery } from "react-responsive";
import Button from "../../../ui/Button/Button";

const BackButton = ({ handleSubmit }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  return (
    <Button
      type="outline"
      style={{
        marginTop: 70,
        marginLeft: 24,
        position: "relative",
        width: isMobile ? "calc(100% - 48px)" : 170
      }}
      text={"Back"}
      onClick={() => handleSubmit()}
    />
  );
};

export default BackButton;
