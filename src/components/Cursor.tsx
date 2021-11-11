import React, { FC } from "react";

const Cursor: FC = () => {
  return (
    <div className="cursor-style">
      <div className="bar" />
      <div style={{ position: "relative" }}>
        <div className="autocomplete empty"></div>
      </div>
    </div>
  );
};

export default Cursor;
