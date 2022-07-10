import { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import TvContext from "./context/TvContext";

import FilterList from "./components/filter-items/FilterList";
import AllChannelsList from "./components/tv-items/AllChannelsList";
import SingleChannelList from "./components/tv-items/SingleChannelList";

import Test from "./UI/Test.jsx";
import "./App.css";

function App() {
  const tvCtx = useContext(TvContext);

  useEffect(() => {
    console.log("test-ctx: ", tvCtx);
    //console.log("programs: ", tvCtx.programs.length);
  }, [tvCtx]);

  return (
    <>
      {/* <TvControllerProvider>
        <Test />
      </TvControllerProvider> */}
      {tvCtx.tvData.favorite !== undefined && <FilterList />}
      <Switch>
        <Route path={"/tv"} exact>
          <AllChannelsList />
          
          
        </Route>
        <Route path={"/tv&:channelId"}>
          {/* <SingleChannelList daysDate={tvEventInit.daysDate} /> */}
          {/* <SingleChannelList /> */}
        </Route>
      </Switch>
    </>
  );
}

export default App;
