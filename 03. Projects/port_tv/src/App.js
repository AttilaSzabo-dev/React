import { useState, useEffect, useCallback } from "react";
import { Route, Switch, Link } from "react-router-dom";

import AllChannelsList from "./components/tv-items/AllChannelsList";
import "./App.css";

function App() {
  const [tvEventInit, setTvEventInit] = useState(null);
  const [error, setError] = useState(null);
  //const [tvEventApi, setTvEventApi] = useState(null);

  const fetchTvEventInit = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("tv-event/init");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setTvEventInit(await response.json());
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    console.log("fetchTvEventInit");
    fetchTvEventInit();
  }, [fetchTvEventInit]);

  if (tvEventInit !== null) {
    console.log(tvEventInit);
  }

  let content = "";

  if (tvEventInit !== null) {
    content = (
      <AllChannelsList
        ageLimit={tvEventInit.ageLimit}
        channelGroups={tvEventInit.channelGroups}
        channels={tvEventInit.channels}
        date={tvEventInit.date.split('T')[0]}
        days={tvEventInit.days}
        daysDate={tvEventInit.daysDate}
        services={tvEventInit.services}
        showType={tvEventInit.showType}
      />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <Switch>
        <Route path={"/tv"} exact>
          {content}
        </Route>
        <Route path={"/tv/test"}>
          <Link to="/tv">
            <p>test</p>
          </Link>
        </Route>
      </Switch>
    </>
  );
}

export default App;
