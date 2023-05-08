import React, { memo } from "react";

const RightArrow = ({ func, style, testId }) => {
  return (
    <div data-testid={testId} onClick={func} className={style}>
      <i className="right chevron icon align-self-center"></i>
    </div>
  );
};

export default memo(RightArrow);
