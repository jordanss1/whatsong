import React from "react";

type ModalPropsType = {
  error: Error | null;
  loading: boolean;
};

const Modal = ({ error, loading }: ModalPropsType) => {
  return <div>Modal</div>;
};

export default Modal;
