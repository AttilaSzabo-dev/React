import React from "react";

const FilterContext = React.createContext({
    filterValues: {
        dateFilter: null,
        programFilter: null,
        channelFilter: null
    },
    setFilterValues: () => {}
});

export default FilterContext;