import { useState } from "react";

function useItemTrasfer() {
  const [sharedValue, setSharedValue] = useState();
  const [responseValue, setResponseValue] = useState();

  const communicate = (value) => {
    console.log("communication value: ", value);
    //setSharedValue(value);
    setSharedValue((prevSharedValue) => {
      return value;
    });
    //const response = value;
    //setResponseValue(response);

    //return response;
  };

  return {
    sharedValue,
    responseValue,
    communicate,
  };
}

export default useItemTrasfer;
