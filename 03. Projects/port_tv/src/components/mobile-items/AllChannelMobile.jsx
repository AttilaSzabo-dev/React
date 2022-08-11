import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import FilterContext from "../../context/FilterContext";
import Spinner from "../../UI/Spinner";
import AdFejlecCsik from "../ad-items/AdFejlecCsik";
import AdLB from "../ad-items/AdLB";
import AdRB from "../ad-items/AdRB";
import AdRich from "../ad-items/AdRich";

import classes from "./AllChannelMobile.module.css";

const AllChannelMobile = ({ initData, url, channelFilterUrl }) => {
  const [timeline, setTimeline] = useState([]);
  const [urlIndex, setUrlIndex] = useState(0);
  const [listToShow, setListToShow] = useState({
    actualTime: 0,
    timelineActualTime: 0,
    timelineTimes: [],
    lastKeyword: "",
    lastUrl: "",
    dateFilter: null,
    activeFilters: {
      date: false,
      channel: false,
      program: false,
    },
    mobileChannelFilter: [],
    mobileChannelsAll: [],
    mobileChannelsShow: [],
  });
  const { filterValues } = useContext(FilterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [programFilterArray, setProgramFilterArray] = useState([]);
  const programFilterDict = {
    film: ['documentary','dokumentumfilm','film'],
    sorozat: ['filmsorozat','series'],
    sport: ['sportmusor','sports'],
    sportLive: [],
    reality: ['reality-musor','reality-show'],
    gastro: ['cooking','gasztronomiai-musor']
  };
  // lekérni az aktuális időt: const manualDate = new Date(); - const unixTimestamp = Math.floor(manualDate.getTime() / 1000);
  //mi kell a mobileData-ból: date(hogy tudjuk az aktuális időt) / channelsből: id, logo, name, url / programsból: end_datetime, end_time, film_url, start_datetime, start_time, title

  const createFullList = (data, type) => {
    let actualTime;
    let actualTimeUnix;
    let timelineActualTime;
    let timelineActualTimeUnix;

    if (listToShow.activeFilters.date) {
      actualTimeUnix = listToShow.actualTime;
      timelineActualTime = new Date(listToShow.actualTime * 1000);
      timelineActualTime.setMinutes(0);
      timelineActualTime.setSeconds(0);
      timelineActualTimeUnix = Math.floor(timelineActualTime.getTime() / 1000);
    } else {
      actualTime = new Date();
      actualTimeUnix = Math.floor(actualTime.getTime() / 1000);
      timelineActualTime = new Date();
      timelineActualTime.setMinutes(0);
      timelineActualTime.setSeconds(0);
      timelineActualTimeUnix = Math.floor(timelineActualTime.getTime() / 1000);
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
          film_url: program.film_url,
          title: program.title,
          restriction: program.restriction
        };
        channelObject.programs.push(programObject);
      });
      fullListArray.push(channelObject);
    });

    switch (type) {
      case "mobileChannelsAll":
        setListToShow((prev) => ({
          ...prev,
          actualTime: actualTimeUnix,
          timelineActualTime: timelineActualTimeUnix,
          lastKeyword: type,
          mobileChannelsAll: [...prev.mobileChannelsAll, fullListArray],
        }));
        break;
      case "mobileChannelFilter":
        setListToShow((prev) => ({
          ...prev,
          actualTime: actualTimeUnix,
          timelineActualTime: timelineActualTimeUnix,
          lastKeyword: type,
          mobileChannelFilter: [fullListArray],
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
      group.forEach((channels) => {
        startTime.push(channels.programs[0].start_unixtime);
        endTime.push(
          channels.programs[channels.programs.length - 1].end_unixtime
        );
      });
    });
    const minStart = Math.min(...startTime);
    const minMilliseconds = minStart * 1000;
    const minDateObject = new Date(minMilliseconds);
    minDateObject.setMinutes(0);
    minDateObject.setSeconds(0);
    const startUnixTimestamp = Math.floor(minDateObject.getTime() / 1000);

    const minEnd = Math.min(...endTime);
    const maxMilliseconds = minEnd * 1000;
    const maxDateObject = new Date(maxMilliseconds);
    maxDateObject.setMinutes(0);
    maxDateObject.setSeconds(0);
    const endUnixTimestamp = Math.floor(maxDateObject.getTime() / 1000);

    let incrementValue = startUnixTimestamp;
    let timelineArray = [];

    do {
      const startDateObject = new Date(incrementValue * 1000);
      const endDateFormatHour = startDateObject.toLocaleString("hu-HU", {
        hour: "2-digit",
      });

      let timeObject = {
        timestamp: incrementValue,
        humanTime: endDateFormatHour + ":00",
      };
      timelineArray.push(timeObject);

      incrementValue += 3600;
    } while (incrementValue <= endUnixTimestamp);

    setListToShow((prev) => ({
      ...prev,
      timelineTimes: timelineArray,
    }));
  };

  const createPartialPrograms = (taskId) => {
    let taskArray = [...listToShow[listToShow.lastKeyword]];
    let arrayToShow = [];

    console.log("taskArray: ", taskArray);
    taskArray.forEach((group) => {
      let groupArray = [];
      group.forEach((channel) => {
        let programIndex = 0;
        let useIndex = false;
        const channelObject = {
          id: channel.id,
          logo: channel.logo,
          name: channel.name,
          url: channel.url,
          programs: [],
          programFilters: []
        };
        channel.programs.forEach((program, index) => {
          if (
            (program.start_unixtime < listToShow.timelineActualTime &&
              program.end_unixtime > listToShow.timelineActualTime) ||
            (program.start_unixtime === listToShow.timelineActualTime &&
              program.end_unixtime > listToShow.timelineActualTime)
          ) {
            programIndex = index;
            useIndex = true;

            let width =
              100 -
              ((program.end_unixtime - listToShow.actualTime) /
                (program.end_unixtime - program.start_unixtime)) *
                100;
            if (width > 100) {
              width = 100;
            } else if (width < 0) {
              width = 0;
            }

            const programObject = {
              start_unixtime: program.start_unixtime,
              start_time: program.start_time,
              end_unixtime: program.end_unixtime,
              end_time: program.end_time,
              film_url: program.film_url,
              title: program.title,
              width: width + "%",
            };

            channelObject.programs.push(programObject);
          }

          if (useIndex && index <= programIndex + 2 && index !== programIndex) {
            const programObject = {
              start_unixtime: program.start_unixtime,
              start_time: program.start_time,
              end_unixtime: program.end_unixtime,
              end_time: program.end_time,
              film_url: program.film_url,
              title: program.title,
            };
            channelObject.programs.push(programObject);
          }
          if (!channelObject.programFilters.includes(program.restriction.category)) {
            channelObject.programFilters.push(program.restriction.category)
          }
        });
        groupArray.push(channelObject);
      });
      arrayToShow.push(groupArray);
    });

    setListToShow((prev) => ({
      ...prev,
      mobileChannelsShow: arrayToShow,
    }));
  };

  useEffect(() => {
    if (listToShow.timelineActualTime !== 0) {
      createPartialPrograms();
    }
  }, [listToShow.timelineActualTime]);

  useEffect(() => {
    if (listToShow.mobileChannelsAll.length !== 0) {
      createTimelineTimes("mobileChannelsAll");
      createPartialPrograms("mobileChannelsAll");
    }
  }, [listToShow.mobileChannelsAll]);

  useEffect(() => {
    if (listToShow.mobileChannelFilter.length !== 0) {
      createTimelineTimes("mobileChannelFilter");
      createPartialPrograms("mobileChannelFilter");
    }
  }, [listToShow.mobileChannelFilter]);

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

    if (
      filterValues.channelFilter !== undefined &&
      filterValues.channelFilter !== null
    ) {
      let filterUrl;
      if (listToShow.activeFilters.date && filterValues.channelFilter !== "0") {
        let originalUrl =
          channelFilterUrl[filterValues.channelFilter].split("date=")[0];
          filterUrl = `${originalUrl}date=${listToShow.dateFilter}`;
      } else {
        filterUrl = channelFilterUrl[filterValues.channelFilter];
      }
      if (filterValues.channelFilter === "0") {
        if (listToShow.activeFilters.date) {
          let defaultUrl = url[0].split("date=")[0];
          filterUrl = `${defaultUrl}date=${listToShow.dateFilter}`;
        }else {
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
          createFullList(data, "mobileChannelFilter");
          setIsLoading(false);
        })
        .catch((error) => {
          //setError(error.message);
        });
      setListToShow((prev) => ({
        ...prev,
        activeFilters: { ...prev.activeFilters, channel: true },
      }));
    }

    if (filterValues.programFilter !== undefined) {
      let allFilters = [];
      filterValues.programFilter.forEach((filter)=> {
        allFilters.push(...programFilterDict[filter]);
      });
      setProgramFilterArray(allFilters);
    }
  }, [filterValues]);

  // filterdate url fetch
  useEffect(() => {
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
        createFullList(data, "mobileChannelFilter");
        setIsLoading(false);
      })
      .catch((error) => {
        //setError(error.message);
      });
  }, [listToShow.dateFilter]);

  console.log("listToShow: ", listToShow);

  // aznapi default url fetch
  useEffect(() => {
    if (!listToShow.activeFilters.date) {
      setIsLoading(true);
      fetch(`${url[urlIndex]}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setListToShow((prev) => ({
            ...prev,
            lastUrl: url[urlIndex],
            dateFilter: url[urlIndex].split("date=")[1]
          }));
          createFullList(data, "mobileChannelsAll");
          setIsLoading(false);
        })
        .catch((error) => {
          //setError(error.message);
        });
    }
  }, [urlIndex]);

  useEffect(() => {
    if (typeof window.pp_gemius_hit === 'function' && typeof window.gemius_identifier === 'string') {
      //nyito gemius kod
      let code = '.cebkuN07HnYk6HbokIXZaRv38OGw.sbhU.kKB3eEiP.Y7';
      if (window.gemius_identifier !== code) {
        window.pp_gemius_hit(code);
        window.gemius_identifier = '';
      }
    }
  }, [initData]);

  const selectTimeHandler = (e) => {
    const attr = e.currentTarget.attributes;
    console.log(attr[0].value);
    setListToShow((prev) => ({
      ...prev,
      timelineActualTime: parseInt(attr[0].value, 10),
    }));
  };

  const timeHandlerLeft = () => {
    setListToShow((prev) => ({
      ...prev,
      timelineActualTime: listToShow.timelineActualTime - 3600,
    }));
  };

  const timeHandlerRight = () => {
    setListToShow((prev) => ({
      ...prev,
      timelineActualTime: listToShow.timelineActualTime + 3600,
    }));
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <div className={classes.timelineWrapper}>
        <button onClick={timeHandlerLeft} className={classes.timelineButton}>
          <MdKeyboardArrowLeft className={classes.timelineArrow} />
        </button>
        <button onClick={timeHandlerRight} className={classes.timelineButton}>
          <MdKeyboardArrowRight className={classes.timelineArrow} />
        </button>
        <div className={classes.sectionWrapper}>
          {listToShow.timelineTimes.map((item) => (
            <div
              key={item.timestamp}
              value={item.timestamp}
              className={`${classes.timelineSections} ${
                item.timestamp >= listToShow.timelineActualTime - 7200 &&
                item.timestamp <= listToShow.timelineActualTime + 7200
                  ? ""
                  : classes.hide
              } ${
                item.timestamp === listToShow.timelineActualTime
                  ? classes.active
                  : ""
              }`}
              onClick={(e) => selectTimeHandler(e)}
            >
              {item.humanTime}
            </div>
          ))}
        </div>
      </div>
      <AdFejlecCsik />
      {listToShow.mobileChannelsShow.length !== 0 &&
        listToShow.mobileChannelsShow.map((group, outerIndex) =>
          group.map((channel, innerIndex) => (
            <>
              {outerIndex === 0 && innerIndex === 2 && <AdLB />}
              {outerIndex === 0 && innerIndex === 6 && <AdRich />}
              {outerIndex === 0 && innerIndex === 10 && <AdRB />}
              {channel.programs[0] !== undefined && (
                <div key={channel.id} className={`${classes.channelWrapper} ${channel.programFilters.some(r=> programFilterArray.includes(r)) ? classes.highlight : ""}`}>
                  <div className={classes.logoWrapper}>
                    <Link
                      to={`/csatorna/tv/${channel.name
                        .replace(" ", "-")
                        .toLowerCase()}/${channel.id}?date=${listToShow.dateFilter}`}
                    >
                      <img src={channel.logo} alt={channel.id} />
                    </Link>
                  </div>
                  <div className={classes.programsWrapper}>
                    <span className={classes.text}>{channel.name}</span>
                    <span
                      className={`${classes.text} ${classes.firstProgram}`}
                    >{`${channel.programs[0].start_time} ${channel.programs[0].title}`}</span>
                    <div className={classes.progressBarContainer}>
                      <div className={classes.progressBarBackground}></div>
                      <div
                        className={classes.progressBarProgress}
                        style={{
                          width: channel.programs[0].width,
                        }}
                      ></div>
                    </div>
                    {channel.programs[1] !== undefined && (
                      <span
                        className={classes.text}
                      >{`${channel.programs[1].start_time} ${channel.programs[1].title}`}</span>
                    )}
                    {channel.programs[2] !== undefined && (
                      <span
                        className={classes.text}
                      >{`${channel.programs[2].start_time} ${channel.programs[2].title}`}</span>
                    )}
                  </div>
                  <Link
                    className={classes.toSingleChannelButton}
                    to={`/csatorna/tv/${channel.name
                      .replace(" ", "-")
                      .toLowerCase()}/${channel.id}?date=${listToShow.dateFilter}`}
                  >
                    <MdKeyboardArrowRight className={classes.channelArrow} />
                  </Link>
                </div>
              )}
            </>
          ))
        )}
    </div>
  );
};

export default AllChannelMobile;
