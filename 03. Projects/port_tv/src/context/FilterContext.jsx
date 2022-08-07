import React from "react";

const FilterContext = React.createContext({
    filterValues: {
        dateFilter: 0,
        programFilter: [],
        channelFilter: null
    },
    setFilterValues: () => {}
});

export default FilterContext;