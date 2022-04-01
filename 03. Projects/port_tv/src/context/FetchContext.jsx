import React from "react";

const FetchContext = React.createContext({
    channels: [],
    runInit: () => {}
});

export default FetchContext;