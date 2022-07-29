import { useState, useEffect, useRef } from "react";

import MarginContext from "../../context/MarginContext";
import Timeline from "../timeline-items/Timeline";
import AdFejlecCsik from "../ad-items/AdFejlecCsik";
import AllChannelPrograms from "./AllChannelPrograms";
import Marker from "../timeline-items/Marker";
import Spinner from "../../UI/Spinner";

import classes from "./AllChannelsList.module.css";

const AllChannelsList = ({ initData, url, channelFilterUrl }) => {
  const [timelineTimes, setTimelineTimes] = useState({
    startTimestamp: 0,
    endTimestamp: 0,
    startMinute: 0,
    startHour: 0,
    endMinute: 0,
    endHour: 0,
    firstProgramsStartTime: [],
  });

  const [programsState, setProgramsState] = useState({
    urlIndex: 0,
    isFiltered: false,
    programListUnfiltered: [],
    programListFiltered: [],
    listToShow: [],
    lazyPrograms: [],
  });
  const [virtualIsActive, setVirtualIsActive] = useState(false);
  const [marginLeftValue, setMarginLeftValue] = useState();
  const value = { marginLeftValue, setMarginLeftValue };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const zones = window.zonesToLoad;

  const programsContainer = useRef(null);

  const urlIndexHandler = () => {
    setProgramsState((prevData) => ({
      ...prevData,
      urlIndex: prevData.urlIndex + 1,
    }));
  };

  const filterChannelsHandler = (value) => {
    if (value === "0") {
      setProgramsState((prev) => ({
        ...prev,
        listToShow: [...prev.programListUnfiltered],
      }));
    } else {
      setIsLoading(true);
      fetch(`${channelFilterUrl[value]}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let objectCreation = {};
          objectCreation.value = value;
          objectCreation.data = data;
          setProgramsState((prev) => ({
            ...prev,
            programListFiltered: [
              ...prev.programListFiltered,
              { ...objectCreation },
            ],
            listToShow: [data],
          }));

          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  // 30perc = 1800 second
  // 30perc = 1800000 milisecond
  // 1800000 milisecond = 150px
  const timelineTimesHandler = () => {
    let startTime = [];
    let endTime = [];
    programsState.listToShow.forEach((item) => {
      item.channels.forEach((channel) => {
        if (channel !== "Virtual") {
          startTime.push(channel.programs[0].start_ts);
          endTime.push(
            Math.floor(
              new Date(
                channel.programs[channel.programs.length - 1].end_datetime
              ).getTime() / 1000
            )
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
    //TODO : csekkolni ha az új starttime vagy endtime nagyobb mint az előző és mindig a legkisebbet kell megtartani
    timelineTimesHandler();
  }, [programsState.listToShow]);

  const createLazyPrograms = (data) => {
    let newData = [];
    setProgramsState((prev) => ({
      ...prev,
      lazyPrograms: [...prev.lazyPrograms, newData],
    }));
  };

  useEffect(() => {
    if (!programsState.isFiltered) {
      setIsLoading(true);
      fetch(`${url[programsState.urlIndex]}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          createLazyPrograms(data);
          setProgramsState((prev) => ({
            ...prev,
            programListUnfiltered: [...prev.programListUnfiltered, data],
            listToShow: [...prev.listToShow, data],
          }));

          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [programsState.urlIndex]);

  useEffect(() => {
    if (virtualIsActive) {
      const zone = window.virtualChannelSponsoration;
      let tempState = { ...programsState };
      let element = [...tempState.listToShow[0].channels];
      element.splice(zone.position, 0, "Virtual");
      tempState.listToShow[0].channels = element;
      setProgramsState((prev) => ({
        ...prev,
        listToShow: tempState.listToShow,
      }));
    }
  }, [virtualIsActive]);

  useEffect(() => {
    if (zones.tv_virtual_sponsoration !== undefined) {
      window.addEventListener(
        `AD.SHOW.${zones.tv_virtual_sponsoration.id}`,
        (event) => {
          setVirtualIsActive(true);
          //console.log("event.detail: ", event.detail);
        }
      );
    }
  }, []);

  console.log("programsToShow: ", programsState.listToShow);
  console.log("programsState: ", programsState);

  return (
    <>
      {programsState.listToShow.length > 0 && (
        <MarginContext.Provider value={value}>
          <Timeline
            onFilterChannels={filterChannelsHandler}
            initData={initData}
            timelineTimes={timelineTimes}
          />
        </MarginContext.Provider>
      )}
      <AdFejlecCsik />
      <div className={classes.channelsWrapper}>
        {isLoading && <Spinner />}
        <div ref={programsContainer} className={classes.programsContainer}>
          <Marker time={initData} timelineTimes={timelineTimes} />
          {programsState.listToShow.length > 0 &&
            programsState.listToShow.map((program, index) => (
              <MarginContext.Provider value={value}>
                <AllChannelPrograms
                  programs={program}
                  initData={initData}
                  timelineTimes={timelineTimes}
                  index={index}
                />
              </MarginContext.Provider>
            ))}
        </div>
      </div>
      {programsState.listToShow.length > 0 && (
        <button onClick={urlIndexHandler}>Increse</button>
      )}
    </>
  );
};

export default AllChannelsList;
