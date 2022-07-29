import { useEffect, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import TvDataContext from "./context/TvDataContext";
import { useMediaQuery } from "react-responsive";

import FilterList from "./components/filter-items/FilterList";
import AllChannelsList from "./components/tv-items/AllChannelsList";
import SingleChannelList from "./components/tv-items/SingleChannelList";

import Test from "./UI/Test.jsx";
import "./App.css";
import AllChannelMobile from "./components/mobile-items/AllChannelMobile";

function App() {
  const [tvData, setTvData] = useState({});
  const [initData, setInitData] = useState(null);

  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const value = { tvData, setTvData, csrf };

  const isDesktop = useMediaQuery({ query: "(min-width: 500px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 499px)" });

  let url;
  let channelFilterUrl;

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
  const createInitUrls = () => {
    let date = `date=${initData.date.split("T")[0]}`;
    let ids = pluck(tvData.favorite, initData.channels, "id");
    let chunks = [...chunk(ids, 40)];
    let urls = chunks.map((chunk) => {
      let channels = chunk.map((id) => `channel_id%5B%5D=${id}`).join("&");
      return `tv-event/api?${channels}&${date}`;
    });

    url = urls;

    let filterUrl = {};
    for (const key in initData.channelGroups) {
      let filteredUrls =
        "tv-event/api?" +
        initData.channels
          .filter((item) => item.groupId === initData.channelGroups[key].id)
          .map((x) => `channel_id%5B%5D=${x.id}`)
          .join("&") +
        "&" +
        date.toString();
      filterUrl[key] = filteredUrls;
    }
    channelFilterUrl = filterUrl;
  };

  useEffect(() => {
    fetch("https://port.hu/tv-event/init")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInitData(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  //TODO: élesítés előtt ezt átállítani https://port.hu/ -ra
  useEffect(() => {
    fetch("https://szaboa-3.dev.port.hu/dashboard/get-tv-data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let notificationsArray = Object.keys(data.notifications);
        let remindersArray = Object.keys(data.reminders);
        setTvData({
          favorite: data.favorite,
          notifications: notificationsArray,
          reminders: remindersArray,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (initData !== null && Object.keys(tvData).length !== 0) {
    createInitUrls();
  }

  const onDateChange = (value) => {
    console.log("day: ", value);
  };

  const onProgramChange = (value) => {
    console.log("programChange: ", value);
  };

  const filterChannelsHandler = (value) => {
    console.log("filterChannelsHandler: ", value);
  };

  console.log("initData: ", initData);
  //console.log("tvData: ", tvData);
  //console.log("url: ", url);
  //console.log("channelFilterUrl: ", channelFilterUrl);
  return (
    <>
      {/*<TvControllerProvider>
        <Test />
      </TvControllerProvider> */}
      <TvDataContext.Provider value={value}>
        {initData !== null && Object.keys(tvData).length !== 0 && (
          <FilterList
            initData={initData}
            dayHandler={onDateChange}
            programHandler={onProgramChange}
            onFilterChannels={filterChannelsHandler}
          />
        )}
        <Switch>
          <Route path={"/tv"}>
            {initData !== null &&
              Object.keys(tvData).length !== 0 &&
              isDesktop && (
                <AllChannelsList
                  initData={initData}
                  url={url}
                  channelFilterUrl={channelFilterUrl}
                />
              )}
            {initData !== null &&
              Object.keys(tvData).length !== 0 &&
              isMobile && (
                <AllChannelMobile
                  initData={initData}
                  url={url}
                  channelFilterUrl={channelFilterUrl}
                />
              )}
          </Route>
          <Route path={"/csatorna/tv/:channelName/:channelId"}>
            {initData !== null && Object.keys(tvData).length !== 0 && (
              <SingleChannelList initData={initData} />
            )}
          </Route>
        </Switch>
      </TvDataContext.Provider>
    </>
  );
}

export default App;
