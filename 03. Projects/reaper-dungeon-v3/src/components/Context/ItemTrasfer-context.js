import React, { useState } from "react";

export const ItemTransferContext = React.createContext({
  itemFromBackpack: null,
  itemToBackpack: null,
  sendFromBackpack: () => {},
  sendToBackpack: () => {},
});

const ItemTransferContextProvider = (props) => {
  const [fromBackpack, setFromBackpack] = useState();
  const [toBackpack, setToBackpack] = useState();

  const sendFromBackpackHandler = (item) => {
    setFromBackpack(item);
  };
  const sendToBackpackHandler = (item) => {
    setToBackpack(item);
  };

  return (
    <ItemTransferContext.Provider
      value={{
        sendFromBackpack: sendFromBackpackHandler,
        sendToBackpack: sendToBackpackHandler,
        itemFromBackpack: fromBackpack,
        itemToBackpack: toBackpack,
      }}
    >
      {props.children}
    </ItemTransferContext.Provider>
  );
};

export default ItemTransferContextProvider;
