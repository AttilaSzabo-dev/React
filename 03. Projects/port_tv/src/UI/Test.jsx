
import { useContext } from "react";
import TvInitContext from "../context/TvInitContext";

const Test = () => {
    const ctx = useContext(TvInitContext);
    const handler = () => {
        ctx.testHandler();
    }

    console.log("ctx: ", ctx);
    return (<button onClick={handler}>Button</button>);
};

export default Test;