import { useEffect, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import TvDataContext from "./context/TvDataContext";

import FilterList from "./components/filter-items/FilterList";
import AllChannelsList from "./components/tv-items/AllChannelsList";
import SingleChannelList from "./components/tv-items/SingleChannelList";

import Test from "./UI/Test.jsx";
import "./App.css";

function App() {
  const [tvData, setTvData] = useState(null);
  const [initData, setInitData] = useState(null);

  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const value = { tvData, setTvData, csrf };

  console.log("App render");

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
    fetch("tv-event/init")
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

  useEffect(() => {
    fetch("dashboard/get-tv-data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTvData(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (initData !== null && tvData !== null) {
    createInitUrls();
  }

  //console.log("initData: ", initData);
  //console.log("tvData: ", tvData);
  //console.log("url: ", url);
  //console.log("channelFilterUrl: ", channelFilterUrl);
  return (
    <>
      {/* <TvControllerProvider>
        <Test />
      </TvControllerProvider> */}
      <TvDataContext.Provider value={value}>
        <Switch>
          <Route path={"/tv"} exact>
            {initData !== null && tvData !== null && (
              <AllChannelsList
                initData={initData}
                url={url}
                channelFilterUrl={channelFilterUrl}
              />
            )}
          </Route>
          <Route path={"/tv&:channelId"}>
            {/* <SingleChannelList daysDate={tvEventInit.daysDate} /> */}
            {/* <SingleChannelList /> */}
          </Route>
        </Switch>
      </TvDataContext.Provider>
    </>
  );
}

export default App;
