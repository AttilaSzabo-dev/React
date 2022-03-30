import { useEffect, useState } from "react";
import TvItemList from "./components/tv-items/TvItemList";

import "./App.css";

function App() {
  const [tvEventInit, setTvEventInit] = useState(null);
  const [tvEventApi, setTvEventApi] = useState(null);

  useEffect(() => {
    async function getData() {
      const initResp = await fetch("tv-event/init");
      setTvEventInit(await initResp.json());
      /* const apiResp = await fetch("tv-event/api?channel_id%5B%5D=tvchannel-5&date=2022-03-30"); 
      setTvEventApi(await apiResp.json()); */
    }
    getData();
  }, []);

  if (tvEventInit !== null) {
    console.log(tvEventInit);
  }
  if (tvEventApi !== null) {
    /* console.log(tvEventApi); */
  }

  return (
    <>
      {tvEventInit !== null ? (
        <TvItemList
          ageLimit={tvEventInit.ageLimit}
          channelGroups={tvEventInit.channelGroups}
          channels={tvEventInit.channels}
          date={tvEventInit.date}
          days={tvEventInit.days}
          daysDate={tvEventInit.daysDate}
          services={tvEventInit.services}
          showType={tvEventInit.showType}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
