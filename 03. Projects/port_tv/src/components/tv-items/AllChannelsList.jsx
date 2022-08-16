import { useState, useEffect, useRef, useContext } from "react";

import MarginContext from "../../context/MarginContext";
import FilterContext from "../../context/FilterContext";
import Timeline from "../timeline-items/Timeline";
import AdFejlecCsik from "../ad-items/AdFejlecCsik";
import AllChannelPrograms from "./AllChannelPrograms";
import Marker from "../timeline-items/Marker";
import Spinner from "../../UI/Spinner";

import classes from "./AllChannelsList.module.css";

const AllChannelsList = ({
  initData,
  url,
  channelFilterUrl,
  introCb = () => {},
  introKey = {},
}) => {
  const [timelineTimes, setTimelineTimes] = useState({
    startTimestamp: 0,
    endTimestamp: 0,
    startMinute: 0,
    startHour: 0,
    endMinute: 0,
    endHour: 0,
    firstProgramsStartTime: [],
  });
  const [listToShow, setListToShow] = useState({
    actualTime: 0,
    timelineActualTime: 0,
    timelineTimes: [],
    lastKeyword: "",
    lastUrl: "",
    urlIndex: 0,
    dateFilter: null,
    activeFilters: {
      date: false,
      channel: false,
      program: false,
    },
    channelFilter: [],
    channelsAll: [],
    channelsShow: [],
  });

  const [virtualInterval, setVirtualInterval] = useState(true);

  const { filterValues } = useContext(FilterContext);

  //**************************************** */
  const calculateMarkerX = () => {
    let today = new Date(); // meghagytam, ha nem lenne valamiert valamikor erteke az initdata.time -nak akkor ezt hasznaljuk
    let staticOffset = 186; // pontos pozicionalashoz
    let markerX = 0;

    if (
      typeof marginLeftValue !== "undefined" &&
      marginLeftValue.hasOwnProperty("marginLeft")
    ) {
      let widthCalc =
        (Math.floor(new Date(initData.date).getTime()) -
          timelineTimes.startTimestamp) /
        12000;

      markerX =
        parseInt(widthCalc) +
        parseInt(marginLeftValue.marginLeft) +
        staticOffset +
        "px";
    }

    return markerX;
  };

  // timer marker leptetese 1 percenkent 5 pixellel, egy ora = 300px, egy perc 5 pixel
  useEffect(() => {
    const interval = setInterval(() => {
      var el = document.getElementById("timedMarker");
      if (el) {
        var offsetLeft = el.offsetLeft;
        var newXcord = parseInt(offsetLeft) + 5 + "px";

        el.style.left = newXcord;
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const gemiusHit = (checkGemiusId) => {
    if (
      typeof window.pp_gemius_hit === "function" &&
      typeof window.gemius_identifier === "string" &&
      typeof window.port_gemius_identifiers === "object"
    ) {
      //nyito gemius kod
      let sectionType = 'tv-nyito';
      let code = window.port_gemius_identifiers[sectionType];
      if (checkGemiusId) {
        if (window.gemius_identifier !== code) {
          console.log('pp_gemius_hit', sectionType, code);
          window.pp_gemius_hit(code);
          window.gemius_identifier = "";
        }
      } else {
        console.log('pp_gemius_hit', sectionType, code);
        window.pp_gemius_hit(code);
      }
    }
  }

  const adoRefresh = () => {
    // csak TV_Nyito
    let masterTvNyito = 'N7CmXSrA8sU6C2.k69bI6CsovYAjH4cgo.eSqOHkpJn.V7';
    if (
      window.ado &&
      window.ADOLoader &&
      window.ADOLoader.options &&
      window.ADOLoader.options.master &&
      window.ADOLoader.options.master === masterTvNyito
    ) {
      console.log('refresh', masterTvNyito);
      window.ado.refresh(masterTvNyito);
    }
  }

  //**************************************** */

  const [virtualIsActive, setVirtualIsActive] = useState(false);
  const [marginLeftValue, setMarginLeftValue] = useState();
  const value = { marginLeftValue, setMarginLeftValue };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const zones = window.zonesToLoad;

  const programsContainer = useRef(null);

  //********************************************* */

  // INIT
  // lekérdezzük a programokat (fetch) mai date - url[0]
  // figyelni kell hogy van-e filter (date, channel)
  // elindítjuk a setIntervalt hogy csekkoljuk a virtual channel zone betöltődött-e
  // elkészítjük a lekért adatokból a showListet
  /* useEffect(()=>{
    console.log("init");
    if (virtualInterval) {
      const virtualIntervalTimer = setInterval(() => {
        if (
          window.virtualIsLoaded === true &&
          listToShow.channelsShow.length !== 0
        ) {
          clearInterval(virtualIntervalTimer);
          setVirtualInterval(false);
          const zone = window.virtualChannelSponsoration;
          let tempState = { ...listToShow.channelsShow };
          let element = [...tempState[0]];
          element.splice(zone.position, 0, "Virtual");
          tempState = element;
          setListToShow((prev) => ({
            ...prev,
            channelsShow: [tempState],
          }));
        }
      }, 1000);
    }
  },[initData]); */

  //********************************************* */

  const createFullList = (data, type) => {
    let actualTime;
    let actualTimeUnix;

    if (listToShow.activeFilters.date) {
      actualTimeUnix = listToShow.actualTime;
    } else {
      actualTime = new Date();
      actualTimeUnix = Math.floor(actualTime.getTime() / 1000);
    }

    let fullListArray = [];

    // végigmegyünk az összes csatornán és elkészítjük a csatorna objectet
    data.channels.forEach((channel) => {
      const channelObject = {
        id: channel.id,
        logo: channel.logo,
        name: channel.name,
        url: channel.url,
        programs: [],
      };
      // végigmegyünk az összes programon és elkészítjük a program objectet
      channel.programs.forEach((program) => {
        const dateStart = new Date(program.start_datetime);
        const unixTimestampStart = Math.floor(dateStart.getTime() / 1000);
        const dateEnd = new Date(program.end_datetime);
        const unixTimestampEnd = Math.floor(dateEnd.getTime() / 1000);
        const programObject = {
          start_unixtime: unixTimestampStart,
          start_time: program.start_time,
          end_unixtime: unixTimestampEnd,
          end_time: program.end_time,
          notificId: program.id,
          reminderId: program.film_id,
          film_url: program.film_url,
          title: program.title,
          restriction: program.restriction,
          short_description: program.short_description,
          episode_title: program.episode_title
        };
        channelObject.programs.push(programObject);
      });
      fullListArray.push(channelObject);
    });

    switch (type) {
      case "channelsAll":
        setListToShow((prev) => ({
          ...prev,
          actualTime: actualTimeUnix,
          lastKeyword: type,
          channelsAll: [...prev.channelsAll, fullListArray],
        }));
        break;
      case "channelFilter":
        setListToShow((prev) => ({
          ...prev,
          actualTime: actualTimeUnix,
          lastKeyword: type,
          channelFilter: [fullListArray],
        }));
        break;
      default:
        break;
    }
  };

  const createTimelineTimes = (stateId) => {
    let startTime = [];
    let endTime = [];
    listToShow[stateId].forEach((group) => {
      group.forEach((channel) => {
        if (channel !== "Virtual") {
          startTime.push(channel.programs[0].start_unixtime);
          endTime.push(
            channel.programs[channel.programs.length - 1].end_unixtime
          );
        }
      });
    });

    const minStart = Math.min(...startTime);
    const minStartMiliseconds = minStart * 1000;
    const startDateObject = new Date(minStartMiliseconds);
    //console.log("startDateObject: ", startDateObject);
    const startDateFormatHour = startDateObject.toLocaleString("hu-HU", {
      hour: "numeric",
    });
    const startDateFormatMinute = startDateObject.toLocaleString("hu-HU", {
      minute: "numeric",
    });

    const startDateFormatMinuteModulo = startDateFormatMinute % 30;
    const startDateFormatMinuteFinal =
      startDateFormatMinute - startDateFormatMinuteModulo;

    const newStartDate = startDateObject.setMinutes(startDateFormatMinuteFinal);

    //console.log("startDateObject: ", startDateObject);
    //console.log("newDate: ", newStartDate);

    // ------------------------------------------------------------------------

    const maxEnd = Math.max(...endTime);
    const maxEndMiliseconds = maxEnd * 1000;
    const endDateObject = new Date(maxEndMiliseconds);
    const endDateFormatHour = endDateObject.toLocaleString("hu-HU", {
      hour: "numeric",
    });
    const endDateFormatMinute = endDateObject.toLocaleString("hu-HU", {
      minute: "numeric",
    });

    const endDateFormatMinuteModulo = endDateFormatMinute % 30;
    const endDateFormatMinuteFinal =
      endDateFormatMinute + endDateFormatMinuteModulo;

    const newEndDate = endDateObject.setMinutes(endDateFormatMinuteFinal);

    console.log("startTime: ", startTime);
    setTimelineTimes({
      startTimestamp: newStartDate,
      endTimestamp: newEndDate,
      startMinute: startDateFormatMinuteFinal,
      startHour: +startDateFormatHour,
      endMinute: endDateFormatMinuteFinal,
      endHour: +endDateFormatHour,
      firstProgramsStartTime: startTime,
    });
  };

  useEffect(() => {
    if (listToShow.channelsAll.length !== 0) {
      createTimelineTimes("channelsAll");
      let tempState = [];
      if (window.virtualIsLoaded === true && !virtualInterval) {
        const zone = window.virtualChannelSponsoration;
        tempState = [...listToShow.channelsAll];
        let element = [...tempState[0]];
        element.splice(zone.position, 0, "Virtual");
        tempState[0] = element;
      }
      setListToShow((prev) => ({
        ...prev,
        channelsShow: (window.virtualIsLoaded === true && !virtualInterval) ? tempState : listToShow.channelsAll,
      }));
    }
  }, [listToShow.channelsAll]);

  useEffect(() => {
    if (listToShow.channelFilter.length !== 0) {
      createTimelineTimes("channelFilter");
      let tempState = [];
      if (window.virtualIsLoaded === true && !virtualInterval) {
        const zone = window.virtualChannelSponsoration;
        tempState = [...listToShow.channelFilter];
        let element = [...tempState[0]];
        element.splice(zone.position, 0, "Virtual");
        tempState[0] = element;
      }
      setListToShow((prev) => ({
        ...prev,
        channelsShow: (window.virtualIsLoaded === true && !virtualInterval) ? tempState : listToShow.channelFilter,
      }));
    }
  }, [listToShow.channelFilter]);

  useEffect(() => {
    console.log("filterValues: ", filterValues);
    if (
      filterValues.dateFilter !== undefined &&
      filterValues.dateFilter !== 0 &&
      filterValues.dateFilter !== listToShow.dateFilter
    ) {
      const filterDate = new Date(filterValues.dateFilter * 1000);
      const year = filterDate.getFullYear();
      const yearUpdate = filterDate.getFullYear();
      const month = filterDate.toLocaleString("hu-HU", { month: "2-digit" });
      const monthUpdate = filterDate.getMonth();
      const day = filterDate.toLocaleString("hu-HU", { day: "2-digit" });
      const dayUpdate = filterDate.getDate();
      const finalDate = `${year}-${month}-${day}`;

      const actualDate = new Date();
      actualDate.setFullYear(yearUpdate);
      actualDate.setMonth(monthUpdate);
      actualDate.setDate(dayUpdate);
      const actualDateUnix = Math.floor(actualDate.getTime() / 1000);

      setListToShow((prev) => ({
        ...prev,
        actualTime: actualDateUnix,
        dateFilter: finalDate,
        activeFilters: { ...prev.activeFilters, date: true },
      }));
    }
  }, [filterValues]);

  // filterdate url fetch
  useEffect(() => {
    if (listToShow.activeFilters.date) {
      let lastUrl = listToShow.lastUrl;
      let lastUrlSplit = lastUrl.split("date=")[0];
      let newUrl = "";
      if (listToShow.dateFilter === null) {
        const actualDate = new Date();
        const year = actualDate.getFullYear();
        const month = actualDate.toLocaleString("hu-HU", { month: "2-digit" });
        const day = actualDate.toLocaleString("hu-HU", { day: "2-digit" });
        const finalDate = `${year}-${month}-${day}`;
        newUrl = `${lastUrlSplit}date=${finalDate}`;
      } else {
        newUrl = `${lastUrlSplit}date=${listToShow.dateFilter}`;
      }
      setIsLoading(true);
      fetch(`${newUrl}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setListToShow((prev) => ({
            ...prev,
            lastUrl: newUrl,
          }));
          createFullList(data, "channelFilter");
          setIsLoading(false);
          console.log("filterdate filter: ", data);
        })
        .catch((error) => {
          //setError(error.message);
        });
    }
  }, [listToShow.dateFilter]);

  // filterdate nélküli url fetch
  useEffect(() => {
    if (!listToShow.activeFilters.date) {
      setIsLoading(true);
      fetch(`${url[listToShow.urlIndex]}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setListToShow((prev) => ({
            ...prev,
            lastUrl: url[listToShow.urlIndex],
            dateFilter: url[listToShow.urlIndex].split("date=")[1],
          }));
          createFullList(data, "channelsAll");
          console.log("filterdate: ", data);

          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [listToShow.urlIndex]);

  const urlIndexHandler = () => {
    setListToShow((prevData) => ({
      ...prevData,
      urlIndex: prevData.urlIndex + 1,
    }));
    gemiusHit(false);
    adoRefresh();
  };

  const filterChannelsHandler = (value) => {
    let filterUrl;
    if (listToShow.activeFilters.date && value !== "0") {
      let originalUrl = channelFilterUrl[value].split("date=")[0];
      filterUrl = `${originalUrl}date=${listToShow.dateFilter}`;
    } else {
      filterUrl = channelFilterUrl[value];
    }
    if (value === "0") {
      if (listToShow.activeFilters.date) {
        let defaultUrl = url[0].split("date=")[0];
        filterUrl = `${defaultUrl}date=${listToShow.dateFilter}`;
      } else {
        filterUrl = url[0];
      }
    }

    setIsLoading(true);
    fetch(`${filterUrl}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setListToShow((prev) => ({
          ...prev,
          lastUrl: filterUrl,
        }));
        createFullList(data, "channelFilter");
        setIsLoading(false);
      })
      .catch((error) => {
        //setError(error.message);
      });
    setListToShow((prev) => ({
      ...prev,
      activeFilters: { ...prev.activeFilters, channel: true },
    }));
    gemiusHit(false);
    adoRefresh();
  };

  //TODO: itervalt kezelni, szűrők esetén is alkalmazni kell
  useEffect(() => {
    if (virtualInterval) {
      const virtualIntervalTimer = setInterval(() => {
        if (
          window.virtualIsLoaded === true &&
          listToShow.channelsShow.length !== 0
        ) {
          clearInterval(virtualIntervalTimer);
          setVirtualInterval(false);
          const zone = window.virtualChannelSponsoration;
          let tempState = { ...listToShow.channelsShow };
          let element = [...tempState[0]];
          element.splice(zone.position, 0, "Virtual");
          tempState = element;
          setListToShow((prev) => ({
            ...prev,
            channelsShow: [tempState],
          }));
        }
      }, 1000);
    }
  }, [virtualInterval, listToShow.channelsShow]);

  useEffect(() => {
    gemiusHit(true);
  }, [initData]);

  console.log("listToShow: ", listToShow);

  return (
    <>
      {listToShow.channelsShow.length > 0 && (
        <MarginContext.Provider value={value}>
          <Timeline
            onFilterChannels={filterChannelsHandler}
            initData={initData}
            actualTime={listToShow.actualTime}
            timelineTimes={timelineTimes}
            introCb={introCb}
            introKey={introKey}
          />
        </MarginContext.Provider>
      )}
      <AdFejlecCsik />
      <div className={classes.channelsWrapper}>
        {isLoading && <Spinner />}
        <div ref={programsContainer} className={classes.programsContainer}>
          <Marker time={calculateMarkerX()} />
          {listToShow.channelsShow.length > 0 &&
            listToShow.channelsShow.map((channels, index) => (
              <MarginContext.Provider value={value}>
                <AllChannelPrograms
                  channels={channels}
                  actualTime={listToShow.actualTime}
                  timelineTimes={timelineTimes}
                  index={index}
                  date={listToShow.dateFilter}
                  introCb={introCb}
                  introKey={introKey}
                />
              </MarginContext.Provider>
            ))}
        </div>
      </div>
      {listToShow.channelsShow.length > 0 && (
        <button
          disabled={
            listToShow.activeFilters.channel || listToShow.urlIndex === 3
          }
          className={classes.moreChannels}
          onClick={urlIndexHandler}
        >
          {listToShow.activeFilters.channel || listToShow.urlIndex === 3
            ? "Nincs több csatorna"
            : "Több csatorna"}
        </button>
      )}
    </>
  );
};

export default AllChannelsList;
