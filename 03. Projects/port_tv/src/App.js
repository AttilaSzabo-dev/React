import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import AllChannelsList from "./components/tv-items/AllChannelsList";
import SingleChannelList from "./components/tv-items/SingleChannelList";

import "./App.css";

function App() {
  const [tvEventInit, setTvEventInit] = useState(null);
  const [tvData, setTvData] = useState(null);
  
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    fetch("dashboard/get-tv-data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTvData(data);
      })
      .then(() => {
        /* const csrf = document.querySelector('meta[name="csrf-token"]').content;
        console.log(csrf); */
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (tvEventInit !== null) {
    console.log("tvEventInit: ", tvEventInit);
  }
  if (tvData !== null) {
    console.log("tvData: ", tvData);
  }

  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  //console.log(csrf);

  return (
    <>
      <Switch>
        <Route path={"/tv"} exact>
          {tvEventInit !== null && (
            <AllChannelsList tvEventInit={tvEventInit} tvData={tvData} csrf={csrf} />
          )}
        </Route>
        <Route path={"/tv/:channelId"}>
          {tvEventInit !== null && (
            <SingleChannelList daysDate={tvEventInit.daysDate} />
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;
