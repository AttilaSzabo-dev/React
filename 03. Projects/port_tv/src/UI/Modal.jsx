import ReactDOM from "react-dom";

import { useContext } from "react";
import TvContext from "../context/TvContext";

import classes from "./Modal.module.css";

const Modal = (props) => {
  const tvCtx = useContext(TvContext);
  const Backdrop = () => {
    return <div className={`${classes.backdrop} ${tvCtx.switches.modal ? classes.show : ""}`} onClick={tvCtx.setModal} />;
  };

  const ModalOverlay = (props) => {
    return <div className={`${classes.modal} ${tvCtx.switches.modal ? classes.show : ""}`}>{props.children}</div>;
  };

  const portalElement = document.getElementById("overlays");

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
