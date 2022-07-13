import ReactDOM from "react-dom";

import { useContext } from "react";
import ModalContext from "../context/ModalContext";

import "./modal.css";

const Modal = (props) => {
  const ctx = useContext(ModalContext);

  const portalElement = document.getElementById("overlays");

  return (
    <>
      {ReactDOM.createPortal(<div className={`backdrop ${props.toShow}`} onClick={ctx.setModal} />, portalElement)}
      {ReactDOM.createPortal(
        <div className={`modal ${props.toShow}`}>{props.children}</div>,
        portalElement
      )}
    </>
  );
};

export default Modal;
