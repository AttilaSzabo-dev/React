import { useEffect, useReducer } from "react";

import TvContext from "./TvContext";

const defState = {
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
  urlIndex: 0,
  filteredChannelUrl: {},
  filteredProgramChannelUrl: {},
  programs: [],
  csrf: "",
  tvData: {},
  switches: {
    modal: false,
    loading: false,
  },
};

const pluck = (favArray, array, key) => {
  let tempfavArray = [...favArray];
  array.forEach(function (item) {
    if (!tempfavArray.includes(item[key])) {
      tempfavArray.push(item[key]);
    }
  });
  return tempfavArray;
};

function* chunk(array, n) {
  for (let index = 0; index < array.length; index += n) {
    yield array.slice(index, index + n);
  }
}

const tvContextReducer = (state, action) => {
  if (action.type === "INIT") {
    let csrf = document.querySelector('meta[name="csrf-token"]').content;

    return {
      ...state,
      ageLimit: action.data.ageLimit,
      channelGroups: action.data.channelGroups,
      channels: action.data.channels,
      date: action.data.date,
      days: action.data.days,
      daysDate: action.data.daysDate,
      showType: action.data.showType,
      csrf: csrf,
    };
  }

  if (action.type === "CREATE_BASIC_URLS") {
    let date = `date=${state.date.split("T")[0]}`;
    let ids = pluck(action.tvData.favorite, state.channels, "id");
    let chunks = [...chunk(ids, 40)];
    let urls = chunks.map((chunk) => {
      let channels = chunk.map((id) => `channel_id%5B%5D=${id}`).join("&");
      return `tv-event/api?${channels}&${date}`;
    });

    let filterUrl = {};
    for (const key in state.channelGroups) {
      let filteredUrls =
        "tv-event/api?" +
        state.channels
          .filter((item) => item.groupId === state.channelGroups[key].id)
          .map((x) => `channel_id%5B%5D=${x.id}`)
          .join("&") +
        "&" +
        date.toString();
      filterUrl[key] = filteredUrls;
    }

    return {
      ...state,
      basicUrl: urls,
      filteredChannelUrl: filterUrl,
      tvData: {
        favorite: action.tvData.favorite,
        reminders: action.tvData.reminders,
        notifications: action.tvData.notifications,
      },
    };
  }

  if (action.type === "CREATE_FIRST_PROGRAMS") {
    
    /* console.log("prData init: ", prData);
    fetch(`${state.basicUrl[state.urlIndex]}`)
      .then((res) => {
        return res.json();
      })
      .then((programData) => {
        console.log("programData: ", programData);
        console.log("prData before: ", prData);
        prData = programData;
        console.log("prData after: ", prData);
      })
      .catch((error) => {
        setError(error.message);
      });
      console.log("prData set: ", prData); */

    /* return {
      ...state,
      programs: [...state.programs, prData]
    }; */
  }

  if (action.type === "CREATE_MORE_PROGRAMS") {
    const programArray = [];
    fetch(`${state.basicUrl[state.urlIndex]}`)
      .then((res) => {
        return res.json();
      })
      .then((programData) => {
        programArray.push(programData)
      })
      .catch((error) => {
        //setError(error.message);
      });


    return {
      ...state,
      programs: programArray
    };
  }

  if (action.type === "SET_PROGRAMS") {
    return {
      ...state,
      programs: [...state.programs, action.value],
    };
  }

  if (action.type === "SET_MODAL") {
    return {
      ...state,
      switches: { modal: !state.switches.modal },
    };
  }

  if (action.type === "SET_IS_LOADING") {
    return {
      ...state,
      switches: { loading: !state.switches.loading },
    };
  }

  if (action.type === "SET_FAVORITES") {
    return {
      ...state,
      tvData: { ...state.tvData, favorite: action.value },
    };
  }

  if (action.type === "SET_REMINDERS") {
    console.log("action: ", action);
    return {
      ...state,
      tvData: { ...state.tvData, reminders: action.value}
    };
  }

  if (action.type === "SET_NOTIFICATIONS") {
    console.log("action: ", action);
    return {
      ...state,
      tvData: { ...state.tvData, notifications: action.value}
    };
  }

  if (action.type === "SET_URL_INDEX") {
    return {
      ...state,
      urlIndex: state.urlIndex + 1,
    };
  }

  return state;
};

const TvControllerProvider = (props) => {
  console.log("Provider render");
  const [initState, dispatch] = useReducer(tvContextReducer, defState);

  useEffect(() => {
    fetch("tv-event/init")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "INIT", data: data });
        fetch("dashboard/get-tv-data")
          .then((res) => {
            return res.json();
          })
          .then((tvData) => {
            dispatch({ type: "CREATE_BASIC_URLS", tvData: tvData });
            //dispatch({ type: "CREATE_FIRST_PROGRAMS" });

            //dispatch({ type: "SET_IS_LOADING" });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const modalHandler = () => {
    dispatch({ type: "SET_MODAL" });
  };

  const setLoadingHandler = () => {
    dispatch({ type: "SET_IS_LOADING" });
  };

  const favoritesHandler = (value) => {
    dispatch({ type: "SET_FAVORITES", value: value });
  };

  const remindersHandler = (value) => {
    dispatch({ type: "SET_REMINDERS", value: value });
  };

  const notificationsHandler = (value) => {
    dispatch({ type: "SET_NOTIFICATIONS", value: value });
  };

  const programHandler = (value) => {
    dispatch({ type: "SET_PROGRAMS", value: value });
  };

  const urlIndexHandler = (value) => {
    dispatch({ type: "SET_URL_INDEX", value: value });
  };

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
    urlIndex: initState.urlIndex,
    filteredChannelUrl: initState.filteredChannelUrl,
    filteredProgramChannelUrl: initState.filteredProgramChannelUrl,
    programs: initState.programs,
    csrf: initState.csrf,
    tvData: initState.tvData,
    switches: initState.switches,
    setModal: modalHandler,
    setLoading: setLoadingHandler,
    setFavorites: favoritesHandler,
    setReminders: remindersHandler,
    setNotifications: notificationsHandler,
    setPrograms: programHandler,
    setUrlIndex: urlIndexHandler
  };

  return (
    <TvContext.Provider value={tvInitContext}>
      {props.children}
    </TvContext.Provider>
  );
};

export default TvControllerProvider;
