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
import AdChannelSource from "../ad-items/AdChannelSource";
import AdLayer from "../ad-items/AdLayer";

const AllChannelMobile = ({
  initData,
  url,
  channelFilterUrl,
  introCb = () => {},
  introKey = {},
}) => {
  const zones = window.zonesToLoad;
  const [timeline, setTimeline] = useState([]);
  const [listToShow, setListToShow] = useState({
    actualTime: 0,
    timelineActualTime: 0,
    timelineTimes: [],
    urlIndex: 0,
    lastKeyword: "",
    lastUrl: "",
    dateFilter: null,
    programFilter: null,
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
  const programFilterDict = {
    film: ["documentary", "dokumentumfilm", "film"],
    sorozat: ["filmsorozat", "series"],
    sport: ["sportmusor", "sports"],
    sportLive: ["live"],
    reality: ["reality-musor", "reality-show"],
    gastro: ["cooking", "gasztronomiai-musor"],
  };

  //************************************************ */
  const functionSelfName = "AllChannelMobile";
  const [introCalled, setIntroCalled] = useState(false);
  useEffect(() => {
    if (
      listToShow.mobileChannelsShow.length !== 0 &&
      !introCalled &&
      typeof functionSelfName == "string" &&
      typeof introCb === "function" &&
      typeof introKey[functionSelfName] === "string"
    ) {
      setIntroCalled(true);
      introCb(introKey[functionSelfName]);
    }
  });

  const gemiusHit = (checkGemiusId, extra) => {
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
  }

  //************************************************ */
  // lekérni az aktuális időt: const manualDate = new Date(); - const unixTimestamp = Math.floor(manualDate.getTime() / 1000);
  //mi kell a mobileData-ból: date(hogy tudjuk az aktuális időt) / channelsből: id, logo, name, url / programsból: end_datetime, end_time, film_url, start_datetime, start_time, title

  const createFullList = (data, type) => {
    console.log("data: ", data);
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
          restriction: program.restriction,
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

  const createPartialPrograms = () => {
    let taskArray = [...listToShow[listToShow.lastKeyword]];
    let arrayToShow = [];

    console.log("taskArray: ", taskArray);
    taskArray.forEach((group) => {
      let groupArray = [];
      group.forEach((channel, index) => {
        let programIndex = 0;
        let useIndex = false;
        const channelObject = {
          ad: false,
          id: channel.id,
          logo: channel.logo,
          name: channel.name,
          url: channel.url,
          programs: [],
          programFilters: [],
          canShow: true
        };

        const adLB = {
          ad: true,
          content: <AdLB key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
        };
        const adRich = {
          ad: true,
          content: <AdRich key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
        };
        const adRb = {
          ad: true,
          content: <AdRB key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
        };
        const adLayer = {
          ad: true,
          content: <AdLayer key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
        };
        const adChannelSource = {
          ad: true,
          content: <AdChannelSource key={Math.floor(Math.random() * (3000000 - 1000000) + 1000000)}/>
        };
        channel.programs.forEach((program, index) => {
          if (
            (program.start_unixtime < listToShow.timelineActualTime &&
              program.end_unixtime > listToShow.timelineActualTime) ||
            (program.start_unixtime === listToShow.timelineActualTime &&
              program.end_unixtime > listToShow.timelineActualTime)
          ) {
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
              restriction: program.restriction,
              width: width + "%",
            };

            if (
              listToShow.timelineActualTime < listToShow.actualTime &&
              listToShow.timelineActualTime + 3600 > listToShow.actualTime)
            {
              if (width < 100) {
                if (listToShow.activeFilters.program) {
                  let checkNormal = listToShow.programFilter.includes(
                    program.restriction.category
                  );
                  let live = program.is_live === undefined ? "" : "live";
                  let checkLive = listToShow.programFilter.includes(live);
                  if (checkNormal || checkLive) {
                    programIndex = index;
                    useIndex = true;
                    channelObject.programs.push(programObject);
                  }else {
                    channelObject.canShow = false;
                  }
                } else {
                  programIndex = index;
                  useIndex = true;
                  channelObject.programs.push(programObject);
                }
              }
            } else {
              if (listToShow.activeFilters.program) {
                let checkNormal = listToShow.programFilter.includes(
                  program.restriction.category
                );
                let live = program.is_live === undefined ? "" : "live";
                let checkLive = listToShow.programFilter.includes(live);
                if (checkNormal || checkLive) {
                  programIndex = index;
                  useIndex = true;
                  channelObject.programs.push(programObject);
                }else {
                  channelObject.canShow = false;
                }
              } else {
                programIndex = index;
                useIndex = true;
                channelObject.programs.push(programObject);
              }
            }

            if (
              !channelObject.programFilters.includes(
                program.restriction.category
              )
            ) {
              channelObject.programFilters.push(program.restriction.category);
            }
          }

          if (useIndex && index <= programIndex + 2 && index !== programIndex) {
            const programObject = {
              start_unixtime: program.start_unixtime,
              start_time: program.start_time,
              end_unixtime: program.end_unixtime,
              end_time: program.end_time,
              film_url: program.film_url,
              title: program.title,
              restriction: program.restriction,
            };
            channelObject.programs.push(programObject);
            /* if (
              !channelObject.programFilters.includes(
                program.restriction.category
              )
            ) {
              channelObject.programFilters.push(program.restriction.category);
            } */
          }
        });
        if (index === 2) {
          groupArray.push(adLB);
        }
        if (index === 8) {
          groupArray.push(adRich);
        }
        if (index === 16) {
          groupArray.push(adRb);
        }
        if (index === 0 && zones.layer !== undefined && zones.layer.device === "mobile") {
          groupArray.push(adLayer);
        }
        if (channelObject.canShow) {
          groupArray.push(channelObject);
        }
      });
      arrayToShow.push(groupArray);
    });
    window.iap_zones = [];
    setListToShow((prev) => ({
      ...prev,
      mobileChannelsShow: arrayToShow,
    }));
  };

  useEffect(()=>{
    if (listToShow.mobileChannelsShow.length > 0) {
      console.log("dispatch hívás");
      window.dispatchEvent(new Event('tv_mobile_loaded'));
    }
  },[listToShow.mobileChannelsShow]);

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
    if (listToShow.mobileChannelsShow.length !== 0) {
      createPartialPrograms();
    }
  }, [listToShow.programFilter]);

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
        urlIndex: 0,
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
          createFullList(data, "mobileChannelFilter");
          setIsLoading(false);
        })
        .catch((error) => {
          //setError(error.message);
        });
      if (filterValues.channelFilter !== "0") {
        setListToShow((prev) => ({
          ...prev,
          activeFilters: { ...prev.activeFilters, channel: true },
        }));
      } else {
        setListToShow((prev) => ({
          ...prev,
          activeFilters: { ...prev.activeFilters, channel: false },
        }));
      }
    }

    if (filterValues.programFilter !== undefined) {
      let allFilters = [];
      filterValues.programFilter.forEach((filter) => {
        allFilters.push(...programFilterDict[filter]);
      });
      if (filterValues.programFilter.length !== 0) {
        setListToShow((prev) => ({
          ...prev,
          programFilter: allFilters,
          activeFilters: { ...prev.activeFilters, program: true },
        }));
      } else {
        setListToShow((prev) => ({
          ...prev,
          programFilter: "empty",
          activeFilters: { ...prev.activeFilters, program: false },
        }));
      }
    }
  }, [filterValues]);

  // filterdate url fetch
  useEffect(() => {
    if (listToShow.activeFilters.date) {
      let newUrl = "";
      let lastUrl = listToShow.lastUrl;
      let lastUrlSplit = lastUrl.split("date=")[0];
      let noChannelFilter = url[listToShow.urlIndex];
      let noChannelFilterSplit = noChannelFilter.split("date=")[0];
      if (!listToShow.activeFilters.channel && listToShow.activeFilters.date) {
        newUrl = `${noChannelFilterSplit}date=${listToShow.dateFilter}`;
      }
      if (listToShow.activeFilters.channel && listToShow.activeFilters.date) {
        if (listToShow.dateFilter === null) {
          const actualDate = new Date();
          const year = actualDate.getFullYear();
          const month = actualDate.toLocaleString("hu-HU", {
            month: "2-digit",
          });
          const day = actualDate.toLocaleString("hu-HU", { day: "2-digit" });
          const finalDate = `${year}-${month}-${day}`;
          newUrl = `${lastUrlSplit}date=${finalDate}`;
        } else {
          newUrl = `${lastUrlSplit}date=${listToShow.dateFilter}`;
        }
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
    }
  }, [listToShow.dateFilter, listToShow.urlIndex]);

  console.log("listToShow: ", listToShow);

  // aznapi default url fetch
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
          createFullList(data, "mobileChannelsAll");
          setIsLoading(false);
        })
        .catch((error) => {
          //setError(error.message);
        });
    }
  }, [listToShow.urlIndex]);

  useEffect(() => {
    gemiusHit(true);
  }, [initData]);

  const selectTimeHandler = (e) => {
    const attr = e.currentTarget.attributes;
    console.log(attr[0].value);
    setListToShow((prev) => ({
      ...prev,
      timelineActualTime: parseInt(attr[0].value, 10),
    }));
    if (listToShow && listToShow.timelineActualTime && listToShow.timelineActualTime !== parseInt(attr[0].value, 10)) {
      gemiusHit(false, 'timeline');
    }
  };

  const timeHandlerLeft = () => {
    setListToShow((prev) => ({
      ...prev,
      timelineActualTime: listToShow.timelineActualTime - 3600,
    }));
    gemiusHit(false, 'timeline-left');
  };

  const timeHandlerRight = () => {
    setListToShow((prev) => ({
      ...prev,
      timelineActualTime: listToShow.timelineActualTime + 3600,
    }));
    gemiusHit(false, 'timeline-right');
  };

  const urlIndexHandler = () => {
    setListToShow((prevData) => ({
      ...prevData,
      urlIndex: prevData.urlIndex + 1,
    }));
    gemiusHit(false, 'channel-next');
  };

  const toShow = (data) => {
    if (listToShow.activeFilters.program) {
      let check = data.some((r) => listToShow.programFilter.includes(r));
      if (check) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const toShowChannel = (data) => {
    if (listToShow.activeFilters.program) {
      let check = listToShow.programFilter.includes(data);
      if (check) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <div className={`${classes.timelineWrapper} introjsTimelineWrapper`}>
        <button
          onClick={timeHandlerLeft}
          className={`${classes.timelineButton} introjsTimelineButtonLeft`}
        >
          <img src="/img/svg/leftArrow.svg" alt="" style={{maxWidth: "unset"}} />
          <MdKeyboardArrowLeft className={classes.timelineArrow} />
        </button>
        <button
          onClick={timeHandlerRight}
          className={`${classes.timelineButton} introjsTimelineButtonRight`}
        >
          <img src="/img/svg/rightArrow.svg" alt="" style={{maxWidth: "unset"}} />
          {/* <MdKeyboardArrowRight className={classes.timelineArrow} /> */}
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
              {channel.ad && channel.content}
              {!channel.ad && channel.programs[0] !== undefined && (
                <div key={channel.id} className={`${classes.channelWrapper} `}>
                  <div className={classes.logoWrapper}>
                    <Link
                      to={`${channel.url}?date=${listToShow.dateFilter}`}
                    >
                      <img src={channel.logo} alt={channel.id} />
                    </Link>
                  </div>
                  <div className={classes.programsWrapper}>
                    <span className={classes.text}>{channel.name}</span>
                    <span
                      className={`${classes.text} ${classes.firstProgram}`}
                    >{`${channel.programs[0].start_time} ${channel.programs[0].title}`}</span>
                    <div
                      className={`${classes.progressBarContainer} ${
                        channel.programs[0].width === "0%"
                          ? classes.progressHidden
                          : ""
                      }`}
                    >
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
                    to={`${channel.url}?date=${listToShow.dateFilter}`}
                  >
                    <MdKeyboardArrowRight className={classes.channelArrow} />
                  </Link>
                </div>
              )}
            </>
          ))
        )}
      {listToShow.mobileChannelsShow.length > 0 && (
        <button
          disabled={
            listToShow.activeFilters.channel || listToShow.urlIndex === 7
          }
          className={classes.moreChannels}
          onClick={urlIndexHandler}
        >
          {listToShow.activeFilters.channel || listToShow.urlIndex === 7
            ? "Nincs több csatorna"
            : "Több csatorna"}
        </button>
      )}
    </div>
  );
};

export default AllChannelMobile;
