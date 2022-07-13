import React from "react";

const ModalContext = React.createContext({
    modal: {},
    setModal: () => {}
});

export default ModalContext;