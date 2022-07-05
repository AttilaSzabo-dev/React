import { useEffect, useReducer, useContext } from "react";

import TvInitContext from "./TvInitContext";
import TvDataContext from "./TvDataContext";

const defFetchContextState = {
  ageLimit: {},
  channelGroups: {},
  channels: [],
  date: "",
  days: [],
  daysDate: [],
  showType: [],
  likedChannels: []
};

const tvInitContextReducer = (state, action) => {
  if (action.type === "INIT") {
    return {
      ageLimit: action.data.ageLimit,
      channelGroups: action.data.channelGroups,
      channels: action.data.channels,
      date: action.data.date,
      days: action.data.days,
      daysDate: action.data.daysDate,
      showType: action.data.showType,
      likedChannels: state.likedChannels
    };
  }

  if (action.type === "ADD_FAVORITES") {

    return {
      ageLimit: state.ageLimit,
      channelGroups: state.channelGroups,
      channels: state.channels,
      date: state.date,
      days: state.days,
      daysDate: state.daysDate,
      showType: state.showType,
      likedChannels: action.fav
    };
  }
  return state;
};

const TvInitContextProvider = (props) => {
  const ctx = useContext(TvDataContext);
  const [initState, dispatchListAction] = useReducer(
    tvInitContextReducer,
    defFetchContextState
  );

  /* const handler = () => {
    dispatchListAction({ type: "INIT", channels: 1 });
  } */

  const addFavoritesHandler = (favChannels) => {
    console.log("favChannels: ", favChannels);
    dispatchListAction({ type: "ADD_FAVORITES", fav: favChannels });
  };


  useEffect(() => {
    console.log("tvDataCtx: ", ctx);
    fetch("tv-event/init")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dispatchListAction({ type: "INIT", data: data });
    })
    .catch((error) => {
      console.log(error.message);
    });
  }, []);
  
  const tvInitContext = {
    ageLimit: initState.ageLimit,
    channelGroups: initState.channelGroups,
    channels: initState.channels,
    date: initState.date,
    days: initState.days,
    daysDate: initState.daysDate,
    showType: initState.showType,
    likedChannels: initState.likedChannels,
    //testHandler: handler
    addFavorites: addFavoritesHandler
  };

  return (
    <TvInitContext.Provider value={tvInitContext}>
      {props.children}
    </TvInitContext.Provider>
  );
};

export default TvInitContextProvider;
