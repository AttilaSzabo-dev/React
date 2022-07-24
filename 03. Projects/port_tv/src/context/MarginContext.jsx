import React from "react";

const MarginContext = React.createContext({
    marginLeftValue: {
        marginLeft: 0
    },
    setMarginLeftValue: () => {}
});

export default MarginContext;