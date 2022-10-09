import React from "react";

const RightArrows = ({ func, style }) => {
  return (
    <div onClick={func} className={style}>
      <i className="right chevron icon align-self-center"></i>
    </div>
  );
};

export default RightArrows;
