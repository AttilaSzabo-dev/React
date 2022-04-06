import { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";

import AllChannelsList from "./components/tv-items/AllChannelsList";
import SingleChannelList from "./components/tv-items/SingleChannelList";

import "./App.css";

function App() {
  const [tvEventInit, setTvEventInit] = useState(null);
  const [allChannelUrl, setAllChannelUrl] = useState([]);
  const [allProgram, setAllProgram] = useState(null);

  const fetchTvEventInit = useCallback(async () => {
    try {
      const response = await fetch("tv-event/init");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setTvEventInit(await response.json());
    } catch (error) {}
  }, []);

  const fetchAllPrograms = useCallback(async () => {
    //setIsLoading(true);
    //setError(null);
    try {
      const response = await fetch(`tv-event/api?${allChannelUrl}`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setAllProgram(await response.json());
    } catch (error) {
      console.log(error);
      //setError(error.message);
    }
    //setIsLoading(false);
  }, [allChannelUrl]);

  useEffect(() => {
    fetchTvEventInit();
  }, [fetchTvEventInit]);

  useEffect(() => {
    if (tvEventInit !== null) {
      let url = "";
      let urlLength = 0;

      tvEventInit.channels.forEach((channel) => {
        url += `channel_id%5B%5D=${channel.id}&`;
        ++urlLength;
        if (urlLength === tvEventInit.channels.length) {
          url += `date=${tvEventInit.date.split("T")[0]}`;
          setAllChannelUrl(url);
        }
      });
    }
  }, [tvEventInit]);

  useEffect(() => {
    if (allChannelUrl.length > 0) {
      fetchAllPrograms();
    }
  }, [allChannelUrl, fetchAllPrograms]);

  const singleChannelHandler = () => {};

  if (tvEventInit !== null) {
    console.log("tvEventInit: ", tvEventInit);
  }

  if (allChannelUrl.length > 0) {
    console.log("allChannelUrl: ", allChannelUrl);
  }

  if (allProgram !== null) {
    console.log("allProgram: ", allProgram);
  }

  return (
    <>
      <Switch>
        <Route path={"/tv"} exact>
          {tvEventInit !== null &&
            allProgram !== null &&
            allChannelUrl.length > 0 && (
              <AllChannelsList allProgram={allProgram} />
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
