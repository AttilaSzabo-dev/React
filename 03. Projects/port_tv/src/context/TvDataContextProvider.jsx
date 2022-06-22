import { useReducer } from "react";

import FetchContext from "./FetchContext";

const defFetchContextState = {
  allChannels: [],
};

const fetchContextReducer = (state, action) => {
  if (action.type === "INIT") {
    let allData = null;
    fetch("tv-event/init")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        allData = data;
      })
      .then
      //futtatni az url készítést
      ();
    return {
      allChannels: allData,
    };
  }

  return defFetchContextState;
};

const FetchContextProvider = (props) => {
  const [fetchState, dispatchFetchAction] = useReducer(
    fetchContextReducer,
    defFetchContextState
  );

  const fetchInit = () => {
    dispatchFetchAction({ type: "INIT" });
  };

  /* channels.forEach((channel) => {
    url += "channel_id%5B%5D=" + channel.id + "&";
    ++urlLength;
    if (urlLength === channels.length) {
      url += "date=" + date;
    }
  }); */

  const fetchContext = {
    allChannels: fetchState.channels,
    runInit: fetchInit,
  };

  return (
    <FetchContext.Provider value={fetchContext}>
      {props.children}
    </FetchContext.Provider>
  );
};

export default FetchContextProvider;
