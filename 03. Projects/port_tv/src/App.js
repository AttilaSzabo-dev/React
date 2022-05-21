import { useState, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";

import AllChannelsList from "./components/tv-items/AllChannelsList";
import SingleChannelList from "./components/tv-items/SingleChannelList";
import Timeline from "./UI/Timeline";

import "./App.css";

function App() {
  const [tvEventInit, setTvEventInit] = useState(null);
  const scrollDelta = useRef();

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

  if (tvEventInit !== null) {
    console.log("tvEventInit: ", tvEventInit);
  }

  const changeDeltaHandler = (delta) => {
    scrollDelta.current.scrollPrograms(delta);
  };

  return (
    <>
      <Switch>
        <Route path={"/tv"} exact>
          <Timeline onChangeDelta={changeDeltaHandler} />
          {tvEventInit !== null && (
            <AllChannelsList tvEventInit={tvEventInit} ref={scrollDelta} />
          )}
        </Route>
        <Route path={"/tv:channelId"}>
          {tvEventInit !== null && (
            <SingleChannelList daysDate={tvEventInit.daysDate} />
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;
