import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import TvInitContext from "../context/TvInitContext";

const Test = () => {
  const [test, setTest] = useState([]);
  const ctx = useContext(TvInitContext);
  const handler = () => {
    ctx.testHandler();
  };

  useEffect(() => {
    if (ctx.basicUrl.length !== 0) {
      setTest((prevData) => [...prevData, ctx.basicUrl]);
    }
  }, [ctx.basicUrl]);

  console.log("test: ", test);
  console.log("ctx: ", ctx);
  /* if (test.length !== 0) {
    console.log("test.basicUrl: ", test);
  } */

  return <button onClick={handler}>Button</button>;
};

export default Test;
