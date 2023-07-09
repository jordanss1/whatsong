import React from "react";

const ModalError = ({ error }: { error: Error }) => {
  return <div>{error.message}</div>;
};

export default ModalError;
