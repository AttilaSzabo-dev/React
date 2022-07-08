import { useEffect, useReducer } from "react";

import TvInitContext from "./TvInitContext";

const defFetchContextState = {
  ageLimit: {},
  channelGroups: {},
  channels: [],
  date: "",
  filterDate: "",
  days: [],
  daysDate: [],
  showType: [],
  likedChannels: [],
  basicUrl: [],
  basicChannelFilterUrl: {},
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
      filterDate: state.filterDate,
      days: action.data.days,
      daysDate: action.data.daysDate,
      showType: action.data.showType,
      likedChannels: state.likedChannels,
      basicUrl: state.basicUrl,
      basicChannelFilterUrl: state.basicChannelFilterUrl,
    };
  }

  /* if (action.type === "ADD_FAVORITES") {
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
  } */

  if (action.type === "ADD_BASIC_URL") {
    let date = `date=${state.date.split("T")[0]}`;
    let ids = pluck(state.channels, "id");
    let chunks = [...chunk(ids, 40)];
    let urls = chunks.map((chunk) => {
      let channels = chunk.map((id) => `channel_id%5B%5D=${id}`).join("&");
      return `tv-event/api?${channels}&${date}`;
    });

    let filterUrl = {};
    for (const key in state.channelGroups) {
      let filteredUrls = "tv-event/api?" + state.channels
        .filter((item) => item.groupId === state.channelGroups[key].id)
        .map((x) => `channel_id%5B%5D=${x.id}`).join("&") + "&" + date 
        .toString();
      filterUrl[key] = filteredUrls;
    }

    return {
      ...state, basicUrl: urls,
      basicChannelFilterUrl: filterUrl
    };
  }

  return state;
};

const TvInitContextProvider = (props) => {
  const [initState, dispatchListAction] = useReducer(
    tvInitContextReducer,
    defFetchContextState
  );

  /* const addFavoritesHandler = (favChannels) => {
    console.log("favChannels: ", favChannels);
    dispatchListAction({ type: "ADD_FAVORITES", fav: favChannels });
  }; */

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
    filterDate: initState.filterDate,
    days: initState.days,
    daysDate: initState.daysDate,
    showType: initState.showType,
    likedChannels: initState.likedChannels,
    basicUrl: initState.basicUrl,
    basicChannelFilterUrl: initState.basicChannelFilterUrl,
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
