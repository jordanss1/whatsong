import React from "react";

const RightArrow = ({ func, style }) => {
  return (
    <div onClick={func} className={style}>
      <i className="right chevron icon align-self-center"></i>
    </div>
  );
};

export default RightArrow;
