import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import TvDataContext from "./context/TvDataContext";
import FilterContext from "./context/FilterContext";
import { useMediaQuery } from "react-responsive";

import FilterList from "./components/filter-items/FilterList2";
import AllChannelsList from "./components/tv-items/AllChannelsList2";
import SingleChannelList from "./components/tv-items/SingleChannelList2";
import AllChannelMobile from "./components/mobile-items/AllChannelMobile";

//********************************************** */

import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import filterListClasses from "./components/filter-items/FilterList.module.css";
import timelineClasses from "./components/timeline-items/Timeline.module.css";
import allChannelLogoClasses from "./components/tv-items/AllChannelLogo.module.css";
import allChannelMobileClasses from "./components/mobile-items/AllChannelMobile.module.css";

//********************************************** */

import "./App.css";

function App() {
  const [tvData, setTvData] = useState({});
  const [filterValues, setFilterValues] = useState({});
  const [initData, setInitData] = useState(null);

  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const tvValue = { tvData, setTvData, csrf };
  const filterValue = { filterValues, setFilterValues };

  const isDesktop = useMediaQuery({ query: "(min-width: 500px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 499px)" });

  //************************************** */
  const [steps, setSteps] = useState([]);
  const [initialStep, setInitialStep] = useState(0);

  const introKey = {
    FilterList: "filterList",
    Timeline: "timeline",
    AllChannelLogo: "allChannelLogo",
    AllChannelMobile: "allChannelMobile",
  };

  const stepDefs = {
    filterList: [
      {
        poz: 1,
        element: `.${filterListClasses.dateContainer}`,
        title: "Melyik nap van ma?",
        intro:
          "Alapból az aktuális nap tévéműsorát látod, de, ha az érdekel, hogy mi megy holnap, holnapután, azt itt tudod beállítani.",
      },
      {
        poz: 2,
        element: `.${filterListClasses.programFilterContainer}`,
        title: "Szűkítsd a kínálatot kategóriák szerint!",
        intro:
          "Ha a filmek érdekelnek, akkor csak a filmeket mutatjuk, ha gasztro műsorra fáj a fogad, máris kiemeljük a kínálatból az összes gasztro műsort.",
      },
    ],
    timeline: [
      {
        poz: 0,
        element: `#introjsWelcome`,
        title: "Hello",
        intro:
          "Üdv az új TV oldalon, amit egy kicsit felturbóztunk, hogy könnyen és gyorsan kiigazodj a tévéműsoron.",
        highlightClass: "introjs-welcome",
        position: "bottom",
      },
      {
        poz: 3,
        element: `.${timelineClasses.timelineFilter}`,
        title: "A tematikus csatornákat itt találod",
        intro:
          "Ha csak a sportcsatornák érdekelnek, azt itt tudod beállítani. De a helyi tévékre, sőt a mesecsatornákra is itt tudsz szűrni.",
      },
      {
        poz: 4,
        element: `.${timelineClasses.sectionWrapper}`,
        title: "Mennyi az idő?",
        intro:
          "Itt láthatod, hogy melyik idősávban megy az adott műsor a tévében.",
      },
      {
        poz: 5,
        element: ".introjsTimelineButtonLeft",
        title: "Korábbi műsorok",
        intro: "Erre a nyílra kattintva megnézheted, hogy mi ment korábban.",
      },
      {
        poz: 6,
        element: ".introjsTimelineButtonRight",
        title: "Következő műsorok",
        intro:
          "Itt pedig meg tudod nézni, hogy mi megy majd a későbbiekben a tévében.",
      },
      {
        poz: 9,
        element: `.${filterListClasses.channelFilterEditContainer}`,
        title: "Kedvencek szerkesztése",
        intro:
          "Itt is be tudod állítani a kedvenc csatornáidat, sőt, sorrendbe is tudod tenni őket, hogy a neked tetsző sorrendben jelenjenek meg a TV oldalon.",
      },
    ],
    allChannelLogo: [
      {
        poz: 7,
        title: "Kedvenc tévécsatornák kiválasztása",
        element: `.${allChannelLogoClasses.likeButton}:first-of-type`,
        intro:
          "A kiválasztott tévécsatornák egyből a lista tetejére kerülnek, hogy azonnal lásd, mi megy épp a kedvenc tévécsatornádon.",
      },
      {
        poz: 8,
        title: "Ha csak egy csatorna érdekel...",
        element: `.${allChannelLogoClasses.imgWrapper}:first-of-type`,
        intro:
          "Kattints a megfelelő csatorna logójára, és máris csak annak a tévének a műsorkínálatát látod az éppen aktuális és a soron következő pár napra vonatkozóan.",
        position: "bottom",
      },
    ],
    allChannelMobile: [
      {
        poz: 0,
        element: `#introjsWelcomeMobile`,
        title: "Hello",
        intro:
          "Üdv az új TV oldalon, amit egy kicsit felturbóztunk, hogy könnyen és gyorsan kiigazodj a tévéműsoron.",
        highlightClass: "introjs-welcome",
        position: "bottom",
      },
      {
        poz: 3,
        element: `.${filterListClasses.channelFilterEditContainer} #selectList`,
        title: "A tematikus csatornákat itt találod",
        intro:
          "Ha csak a sportcsatornák érdekelnek, azt itt tudod beállítani. De a helyi tévékre, sőt a mesecsatornákra is itt tudsz szűrni.",
      },
      {
        poz: 4,
        element: `.introjsTimelineWrapper`,
        title: "Mennyi az idő?",
        intro:
          "Itt láthatod, hogy melyik idősávban megy az adott műsor a tévében.",
      },
      {
        poz: 5,
        element: ".introjsTimelineButtonLeft",
        title: "Korábbi műsorok",
        intro: "Erre a nyílra kattintva megnézheted, hogy mi ment korábban.",
      },
      {
        poz: 6,
        element: ".introjsTimelineButtonRight",
        title: "Következő műsorok",
        intro:
          "Itt pedig meg tudod nézni, hogy mi megy majd a későbbiekben a tévében.",
      },
      {
        poz: 8,
        title: "Ha csak egy csatorna érdekel...",
        element: `.${allChannelMobileClasses.logoWrapper}:first-of-type`,
        intro:
          "Kattints a megfelelő csatorna logójára, és máris csak annak a tévének a műsorkínálatát látod az éppen aktuális és a soron következő pár napra vonatkozóan.",
        position: "bottom",
      },
      {
        poz: 9,
        element: `.${filterListClasses.modalButton}`,
        title: "Kedvencek szerkesztése",
        intro:
          "Itt is be tudod állítani a kedvenc csatornáidat, sőt, sorrendbe is tudod tenni őket, hogy a neked tetsző sorrendben jelenjenek meg a TV oldalon.",
      },
    ],
  };

  // const stepDefsCnt = Object.values(stepDefs).reduce((acc, val) => {return acc + val.length}, 0);
  const stepDefsCnt = 8; // drotozas, de igy mobilon es desktopon is az utolso lepesek hozzaadasa utan indul el
  const stepOptions = {
    nextLabel: "Következő",
    prevLabel: "Előző",
    doneLabel: "Kész",
    dontShowAgain: true,
    dontShowAgainLabel: "Ne mutasd újra!",
    exitOnOverlayClick: false,
  };

  const stepsReSort = () => {
    let back = [],
      tmp;
    steps.forEach((el) => {
      tmp = Object.assign({}, el);
      delete tmp.poz;
      if (typeof el.poz !== "number" || typeof back[el.poz] !== "undefined") {
        back.push(tmp);
      } else {
        back[el.poz] = tmp;
      }
    });
    return back.filter(Boolean);
  };

  const onStepExit = () => {
    if (typeof window.setCookie === "function") {
      window.setCookie("introjs-delayed", "1");
    }
    setSteps([]);
  };

  const onStepStart = () => {
    if (document.getElementById("noti-disabled-modal") !== null) {
      document.getElementById("noti-disabled-modal").remove();
    }
    if (document.querySelector(".modal-backdrop") !== null) {
      document.querySelector(".modal-backdrop").remove();
    }
    document.body.classList.remove("modal-open");
  };

  const addStep = function (arg) {
    // arg atalakitasa megfelelo formatumra
    // megcsinalod az uj elemet az arg alapjan, az lesz az arg

    // console.log(
    //   'addStep - stepDefs:',
    //   'arg:', arg,
    //   'stepdefs:', Object.assign({}, stepDefs[arg])
    // );
    if (
      typeof window.getCookie === "function" &&
      window.getCookie("introjs-delayed") !== "1"
    ) {
      setSteps((prev) => [...prev, ...stepDefs[arg]]);
    }
  };

  //************************************** */

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

  useEffect(() => {
    fetch(
      `${window.location.protocol}//${window.location.host}/dashboard/get-tv-data`
    )
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

  console.log("initData: ", initData);

  return (
    <>
      <TvDataContext.Provider value={tvValue}>
        <FilterContext.Provider value={filterValue}>
          {initData !== null && Object.keys(tvData).length !== 0 && (
            <FilterList
              initData={initData}
              introCb={addStep}
              introKey={introKey}
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
                    introCb={addStep}
                    introKey={introKey}
                  />
                )}
              {initData !== null &&
                Object.keys(tvData).length !== 0 &&
                isMobile && (
                  <AllChannelMobile
                    initData={initData}
                    url={url}
                    channelFilterUrl={channelFilterUrl}
                    introCb={addStep}
                    introKey={introKey}
                  />
                )}
            </Route>
            <Route path={"/csatorna/tv/:channelName/:channelId"}>
              {initData !== null && Object.keys(tvData).length !== 0 && (
                <SingleChannelList initData={initData} />
              )}
            </Route>
          </Switch>
        </FilterContext.Provider>
      </TvDataContext.Provider>
      <Steps
        enabled={steps.length > stepDefsCnt - 1}
        steps={stepsReSort()}
        initialStep={initialStep}
        onExit={onStepExit}
        onStart={onStepStart}
        options={stepOptions}
      />
    </>
  );
}

export default App;
