import { ReactElement } from "react";
import ModalLoader from "./ModalLoader";
import ModalError from "./ModalError";
import "./styles/modal.css";

type ModalPropsType = {
  error: Error | null;
  loading: boolean;
};

const Modal = ({ error, loading }: ModalPropsType): ReactElement => {
  return (
    <div className="modal-background w-100">
      {loading && <ModalLoader />}
      {error && <ModalError error={error} />}
    </div>
  );
};

export default Modal;
