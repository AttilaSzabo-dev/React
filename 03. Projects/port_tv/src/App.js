import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import TvDataContext from "./context/TvDataContext";

import FilterList from "./components/filter-items/FilterList";
import AllChannelsList from "./components/tv-items/AllChannelsList";
import SingleChannelList from "./components/tv-items/SingleChannelList";

import "./App.css";
import TvInitContextProvider from "./context/TvInitContextProvider";
import Test from "./UI/Test.jsx";

function App() {
  //const [tvEventInit, setTvEventInit] = useState(null);
  const [tvData, setTvData] = useState(null);

  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const value = { tvData, setTvData, csrf };

  /* useEffect(() => {
    fetch("tv-event/init")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTvEventInit(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []); */

  useEffect(() => {
    fetch("dashboard/get-tv-data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTvData(data);
        //initCtx.addFavorites(data.favorite);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  /* if (tvEventInit !== null) {
    console.log("tvEventInit: ", tvEventInit);
  } */
  if (tvData !== null) {
    console.log("tvData: ", tvData);
  }

  return (
    <>
      <TvInitContextProvider>
        <Test />
      </TvInitContextProvider>

      <TvDataContext.Provider value={value}>
        {/* {tvEventInit !== null && tvData !== null && (
          <FilterList tvEventInit={tvEventInit} />
        )} */}
        <Switch>
          <Route path={"/tv"} exact>
            <TvInitContextProvider>
              <AllChannelsList />
            </TvInitContextProvider>
          </Route>
          {/* <Route path={"/tv&:channelId"}>
            {tvEventInit !== null && (
              <SingleChannelList daysDate={tvEventInit.daysDate} />
            )}
          </Route> */}
        </Switch>
      </TvDataContext.Provider>
    </>
  );
}

export default App;
