import React, { memo } from "react";

const LeftArrow = ({ func, style, testId }) => {
  return (
    <div data-testid={testId} onClick={func} className={style}>
      <i className="left chevron icon"></i>
    </div>
  );
};

export default memo(LeftArrow);
