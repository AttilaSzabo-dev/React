import { useEffect, useReducer, useContext } from "react";

import TvInitContext from "./TvInitContext";

const defFetchContextState = {
  ageLimit: {},
  channelGroups: {},
  channels: [],
  date: "",
  days: [],
  daysDate: [],
  showType: [],
  likedChannels: [],
  basicUrl: [],
};

const pluck = (array, key) => {
  return array.map((item) => item[key]);
};

function* chunk(array, n) {
  for (let index = 0; index < array.length; index += n) {
    yield array.slice(index, index + n);
  }
}

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
      likedChannels: state.likedChannels,
      basicUrl: state.basicUrl,
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
      likedChannels: action.fav,
    };
  }

  if (action.type === "ADD_BASIC_URL") {
    let date = `date=${state.date.split("T")[0]}`;
    let ids = pluck(state.channels, "id");
    let chunks = [...chunk(ids, 40)];
    let urls = chunks.map((chunk) => {
      let channels = chunk.map((id) => `channel_id%5B%5D=${id}`).join("&");
      return `tv-event/api?${channels}&${date}`;
    });

    return {
      ageLimit: state.ageLimit,
      channelGroups: state.channelGroups,
      channels: state.channels,
      date: state.date,
      days: state.days,
      daysDate: state.daysDate,
      showType: state.showType,
      likedChannels: state.likedChannels,
      basicUrl: urls,
    };
  }

  return state;
};

const TvInitContextProvider = (props) => {
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
    fetch("tv-event/init")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatchListAction({ type: "INIT", data: data });
        dispatchListAction({ type: "ADD_BASIC_URL" });
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
    basicUrl: initState.basicUrl,
    //testHandler: handler
    //addFavorites: addFavoritesHandler
  };

  return (
    <TvInitContext.Provider value={tvInitContext}>
      {props.children}
    </TvInitContext.Provider>
  );
};

export default TvInitContextProvider;
