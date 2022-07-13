import React from "react";

const TvDataContext = React.createContext({
    tvData: {},
    setTvData: () => {},
    csrf: ""
});

export default TvDataContext;