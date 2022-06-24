import React from "react";

/* const TvDataContext = React.createContext({
    favourite: [],
    notifications: {},
    reminders: {}
}); */

const TvDataContext = React.createContext({
    tvData: {},
    setTvData: () => {},
    csrf: ""
});

export default TvDataContext;