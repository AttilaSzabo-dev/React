import { useState, useEffect, useRef, useContext } from "react";

import MarginContext from "../../context/MarginContext";
import FilterContext from "../../context/FilterContext";
import Timeline from "../timeline-items/Timeline";
import AdFejlecCsik from "../ad-items/AdFejlecCsik";
import AllChannelPrograms from "./AllChannelPrograms";
import Marker from "../timeline-items/Marker";
import Spinner from "../../UI/Spinner";
import AdLB from "../ad-items/AdLB";
import AdRB from "../ad-items/AdRB";
import AdRBB from "../ad-items/AdRBB";
import AdVirtual from "../ad-items/AdVirtual";

import classes from "./AllChannelsList.module.css";
import AdVirtualSource from "../ad-items/AdVirtualSource";
import AdLayer from "../ad-items/AdLayer";
import AdChannelSource from "../ad-items/AdChannelSource";

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
    actualTime: Math.floor(new Date(initData.date).getTime() / 1000),
    timelineActualTime: 0,
    timelineTimes: [],
    timelineTime: 0,
    init: true,
    lastKeyword: "",
    lastUrl: "",
    urlIndex: 0,
    dateFilter: initData.date.split("T")[0],
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
    let markerX = 0;

    if (
      typeof marginLeftValue !== "undefined" &&
      marginLeftValue.hasOwnProperty("marginLeft")
    ) {
      let today = new Date();
      let staticOffset = 186; // pontos pozicionalashoz

      let widthCalc =
        (Math.floor(new Date(today).getTime()) -
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

  const gemiusHit = (checkGemiusId, extra) => {
    if (
      typeof window.pp_gemius_hit === "function" &&
      typeof window.gemius_identifier === "string" &&
      typeof window.port_gemius_identifiers === "object"
    ) {
      //nyito gemius kod
      let sectionType = "tv-nyito";
      let code = window.port_gemius_identifiers[sectionType];
      if (checkGemiusId) {
        if (window.gemius_identifier !== code) {
          console.log('pp_gemius_hit', sectionType, code, extra);
          if (extra !== undefined) {
            window.pp_gemius_hit(code, `portevent=${extra}`);
          } else {
            window.pp_gemius_hit(code);
          }
          window.gemius_identifier = "";
        }
      } else {
        console.log('pp_gemius_hit', sectionType, code, extra);
        if (extra !== undefined) {
          window.pp_gemius_hit(code, `portevent=${extra}`);
        } else {
          window.pp_gemius_hit(code);
        }
      }
    }
  };

  //**************************************** */

  const [marginLeftValue, setMarginLeftValue] = useState();
  const value = { marginLeftValue, setMarginLeftValue };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const zones = window.zonesToLoad;

  const programsContainer = useRef(null);

  //********************************************* */
console.log("url: ", url);
  const createFullList = (data) => {
    let actualTime;
    let actualTimeUnix;
    let startTime = [];
    let endTime = [];

    /* if (listToShow.activeFilters.date) {
      actualTimeUnix = listToShow.actualTime;
    } else {
      actualTime = new Date();
      actualTimeUnix = Math.floor(actualTime.getTime() / 1000);
    } */

    let fullListArray = [];

    // végigmegyünk az összes csatornán és elkészítjük a csatorna objectet
    data.channels.forEach((channel, index) => {
      const channelObject = {
        ad: false,
        id: channel.id,
        logo: channel.logo,
        name: channel.name,
        url: channel.url,
        programs: [],
        channelStartTs: channel.programs[0].start_ts
      };
      const virtual = {
        ad: true,
        content: <AdVirtual key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
      };
      const adLB = {
        ad: true,
        content: <AdLB key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
      };
      const adRb = {
        ad: true,
        content: <AdRB key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
      };
      const adRbb = {
        ad: true,
        content: <AdRBB key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
      };
      const adLayer = {
        ad: true,
        content: <AdLayer key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
      };
      const adVirtualSource = {
        ad: true,
        content: <AdVirtualSource key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
      };
      const adChannelSource = {
        ad: true,
        content: <AdChannelSource key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
      };

      startTime.push(channel.programs[0].start_ts);
      endTime.push(
        Math.floor(
          new Date(
            channel.programs[channel.programs.length - 1].end_datetime
          ).getTime()
        ) / 1000
      );
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
          episode_title: program.episode_title,
        };
        channelObject.programs.push(programObject);
      });
      if (!virtualInterval) {
        if (
          window.virtualIsLoaded === true &&
          listToShow.channelsShow.length !== 0
        ) {
          const zone = window.virtualChannelSponsoration;
          if (zone.position === index) {
            fullListArray.push(virtual);
          }
        }
      }
      if (index === 0 && zones.layer !== undefined && zones.layer.device === "desktop") {
        fullListArray.push(adLayer);
      }
      if (index === 0 && zones.tv_virtual_sponsoration !== undefined) {
        fullListArray.push(adVirtualSource);
      }
      if (index === 0 && zones.tv_channel_sponsoration !== undefined) {
        fullListArray.push(adChannelSource);
      }
      if (index === 4 && zones.superleaderboard !== undefined && zones.superleaderboard.device === "desktop") {
        fullListArray.push(adLB);
      }
      if (index === 18 && zones.roadblock_a !== undefined && zones.roadblock_a.device === "desktop") {
        fullListArray.push(adRb);
      }
      if (index === 20 && zones.roadblock_b !== undefined) {
        fullListArray.push(adRbb);
      }
      fullListArray.push(channelObject);
    });

    const minStart = Math.min(...startTime);
    const minStartMiliseconds = minStart * 1000;
    const startDateObject = new Date(minStartMiliseconds);
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

    setTimelineTimes({
      startTimestamp: newStartDate,
      endTimestamp: newEndDate,
      startMinute: startDateFormatMinuteFinal,
      startHour: +startDateFormatHour,
      endMinute: endDateFormatMinuteFinal,
      endHour: +endDateFormatHour,
      firstProgramsStartTime: startTime,
      actualTime: listToShow.actualTime
    });
    window.iap_zones = [];
    console.log("window.iap_zones: ", window.iap_zones);
    setListToShow((prev) => ({
      ...prev,
      channelsShow: fullListArray,
    }));
  };

  useEffect(()=>{
    if (listToShow.channelsShow.length > 0) {
      console.log("dispatch hívás");
      setTimeout(() => {
        window.dispatchEvent(new Event('tv_nyito_desktop_loaded'));
      }, 1000);
    }
  },[listToShow.channelsShow]);

  const fetchUrl = (url) => {
    setIsLoading(true);
    fetch(`${url}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setListToShow((prev) => ({
          ...prev,
          lastUrl: url,
        }));
        createFullList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        //setError(error.message);
      });
  };

  //ide csak akkor lépünk be ha nincs csatorna vagy dátum filter beállítva
  useEffect(() => {
    if (!listToShow.activeFilters.date || !listToShow.activeFilters.channel) {
      const basicUrl = `${url[listToShow.urlIndex].split("date=")[0]}date=${listToShow.dateFilter}`;
      fetchUrl(basicUrl);
      setListToShow((prev) => ({
        ...prev,
        lastUrl: basicUrl,
        init: false
      }));
    }
  }, [listToShow.urlIndex]);

  // virtual csatorna check hogy mikor áll be a zóna, ha beállt beillesztjük a tömbbe
  // init után a createFullListben nézzük mindig, hogy kell-e
  // TODO: ha nem jön virtual sponz, akkor is állítsuk le 20-30s után
  useEffect(() => {
    if (virtualInterval) {
      const virtualIntervalTimer = setInterval(() => {
        if (
          window.virtualIsLoaded === true &&
          listToShow.channelsShow.length !== 0
        ) {
          const virtual = {
            ad: true,
            content: <AdVirtual key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
          };
          clearInterval(virtualIntervalTimer);
          setVirtualInterval(false);
          const zone = window.virtualChannelSponsoration;
          let tempState = [ ...listToShow.channelsShow ];
          let element = [...tempState];
          // layer + 2 sponz miatt
          element.splice(zone.position + 3, 0, virtual);
          tempState = element;
          setListToShow((prev) => ({
            ...prev,
            channelsShow: tempState,
          }));
        }
      }, 1000);
      return () => clearInterval(virtualIntervalTimer);
    }
  }, [listToShow.channelsShow]);

  // SZŰRÉSEK
  const filterChannelsHandler = (value) => {
    if (value !== "0") {
      const filterUrl = `${channelFilterUrl[value].split("date=")[0]}date=${listToShow.dateFilter}`;
      fetchUrl(filterUrl);
      setListToShow((prev) => ({
        ...prev,
        lastUrl: filterUrl,
        activeFilters: { ...prev.activeFilters, channel: true }
      }));
    }else {
      const filterUrl = `${url[listToShow.urlIndex].split("date=")[0]}date=${listToShow.dateFilter}`;
      fetchUrl(filterUrl);
      setListToShow((prev) => ({
        ...prev,
        lastUrl: filterUrl,
        activeFilters: { ...prev.activeFilters, channel: false }
      }));
    }
    gemiusHit(false, "filter-channel");
  };

  useEffect(() => {
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

      const compareDate = new Date();
      const compareYear = compareDate.getFullYear();
      const compareMonth = compareDate.toLocaleString("hu-HU", { month: "2-digit" });
      const compareDay = compareDate.toLocaleString("hu-HU", { day: "2-digit" });
      const finalCompareDate = `${compareYear}-${compareMonth}-${compareDay}`;

      if (finalCompareDate !== finalDate) {
        setListToShow((prev) => ({
          ...prev,
          actualTime: actualDateUnix,
          dateFilter: finalDate,
          activeFilters: { ...prev.activeFilters, date: true },
        }));
      } else {
        setListToShow((prev) => ({
          ...prev,
          actualTime: actualDateUnix,
          dateFilter: finalDate,
          activeFilters: { ...prev.activeFilters, date: false }
        }));
      }
    }
  }, [filterValues.dateFilter]);

  useEffect(()=>{
    if (!listToShow.init) {
      fetchUrl(`${listToShow.lastUrl.split("date=")[0]}date=${listToShow.dateFilter}`);
    }
  },[listToShow.dateFilter]);


  //********************************************* */

  const urlIndexHandlerIncrease = () => {
    fetchUrl(url[listToShow.urlIndex + 1]);
    setListToShow((prevData) => ({
      ...prevData,
      urlIndex: prevData.urlIndex + 1 <= 7 ? prevData.urlIndex + 1 : 7,
    }));
    window.scrollTo({top: 0, behavior: 'smooth'})
    gemiusHit(false, "channel-next");
  };

  const urlIndexHandlerDecrese = () => {
    fetchUrl(url[listToShow.urlIndex - 1]);
    setListToShow((prevData) => ({
      ...prevData,
      urlIndex: prevData.urlIndex - 1 >= 0 ? prevData.urlIndex - 1 : 0,
    }));
    gemiusHit(false, "channel-prev");
  };

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
            timelineTimes={timelineTimes}
            introCb={introCb}
            introKey={introKey}
          />
        </MarginContext.Provider>
      )}
      <AdFejlecCsik />
      {listToShow.channelsShow.length > 0 && (
        <button
          disabled={
            listToShow.activeFilters.channel || listToShow.urlIndex === 0
          }
          className={classes.moreChannels}
          onClick={urlIndexHandlerDecrese}
        >
          {listToShow.activeFilters.channel || listToShow.urlIndex === 0
            ? "A lista elején vagy"
            : "Elöző csatornák"}
        </button>
      )}
      <div className={classes.channelsWrapper}>
        {isLoading && <Spinner />}
        <div ref={programsContainer} className={classes.programsContainer}>
          <Marker time={calculateMarkerX()} />
          {listToShow.channelsShow.length > 0 &&
            listToShow.channelsShow.map((channel, index) => (
              <MarginContext.Provider value={value}>
                <AllChannelPrograms
                  channel={channel}
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
            listToShow.activeFilters.channel || listToShow.urlIndex === 7
          }
          className={classes.moreChannels}
          onClick={urlIndexHandlerIncrease}
        >
          {listToShow.activeFilters.channel || listToShow.urlIndex === 7
            ? "A lista végén vagy"
            : "Következő csatornák"}
        </button>
      )}
    </>
  );
};

export default AllChannelsList;
