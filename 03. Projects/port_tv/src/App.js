import { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";

import AllChannelsList from "./components/tv-items/AllChannelsList";
import SingleChannelList from "./components/tv-items/SingleChannelList";

import "./App.css";

function App() {
  const [tvEventInit, setTvEventInit] = useState(null);

  const fetchTvEventInit = useCallback(async () => {
    try {
      const response = await fetch("tv-event/init");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setTvEventInit(await response.json());
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchTvEventInit();
  }, [fetchTvEventInit]);

  if (tvEventInit !== null) {
    console.log("tvEventInit: ", tvEventInit);
  }

  return (
    <>
      <Switch>
        <Route path={"/tv"} exact>
          <AllChannelsList allProgram={tvEventInit} />
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
