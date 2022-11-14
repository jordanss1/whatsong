import React, { memo } from "react";

const LeftArrow = ({ func, style }) => {
  return (
    <div onClick={func} className={style}>
      <i className="left chevron icon"></i>
    </div>
  );
};

export default memo(LeftArrow);
