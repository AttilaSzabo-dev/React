import { useState, useEffect, useRef, useContext } from "react";
//import { useInView } from "react-intersection-observer";

import TvContext from "../../context/TvContext";

import FilterList from "../filter-items/FilterList";
import Timeline from "../timeline-items/Timeline";
import AllChannelLogo from "./AllChannelLogo";
import AllChannelPrograms from "./AllChannelPrograms";
import Marker from "../timeline-items/Marker";
import Spinner from "../../UI/Spinner";

import classes from "./AllChannelsList.module.css";

const AllChannelsList = ({initData, url, channelFilterUrl}) => {
  const [timelineTimes, setTimelineTimes] = useState({
    startTimestamp: 0,
    endTimestamp: 0,
    startMinute: 0,
    startHour: 0,
    endMinute: 0,
    endHour: 0,
    firstProgramsStartTime: []
  });
  console.log("AllChannelList render");
  const [programs, setPrograms] = useState([]);
  const [basicUrlIndex, setBasicUrlIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const programsContainer = useRef(null);

  const urlIndexHandler = () => {
    setBasicUrlIndex(basicUrlIndex + 1)
  };

  /* const { ref, inView } = useInView({
    
    threshold: 0,
    trackVisibility: true,
    delay: 100,
  }); */

  /* const increseHandler = () => {
    if (tvInitCtx.basicUrl.length === actualUrlsIndex) return;
    setActualUrlsIndex(actualUrlsIndex + 1);
  }; */

  /* if (inView) {
    increseHandler();
  } */
  //console.log(inView);

  const scrollPrograms = (value) => {
    //console.log("testValue: ", value);
    programsContainer.current.scrollLeft += value;
    //console.log("programs scrollWidth: ", programsContainer.current.scrollWidth);
    //console.log("programs scrollLeft: ", programsContainer.current.scrollLeft);
    //console.log("programs scrollWidth - scrollLeft: ", programsContainer.current.scrollWidth - programsContainer.current.scrollLeft);
    //console.log("programs offsetWidth: ", programsContainer.current.offsetWidth);
  };

  const scrollProgramsOnFetch = value => {
    programsContainer.current.scrollTo({
      top: 0,
      left: value,
      behavior: "smooth",
    });
  };

  // 30perc = 1800 second
  // 30perc = 1800000 milisecond
  // 1800000 milisecond = 150px

  useEffect(() => {
    //TODO : csekkolni ha az új starttime vagy endtime nagyobb mint az előző és mindig a legkisebbet kell megtartani
    let startTime = [];
    let endTime = [];
    programs.forEach((item) => {
      console.log("item: ", item);
      item.channels.forEach((channel) => {
        startTime.push(channel.programs[0].start_ts);
        endTime.push(
          Math.floor(
            new Date(
              channel.programs[channel.programs.length - 1].end_datetime
            ).getTime() / 1000
          )
        );
      });
    });

    //console.log("endTime: ", endTime);

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
      firstProgramsStartTime: startTime
    });
    //console.log("endTime: ", endTime);
    //console.log("startDateFormatMinuteFinal: ", startDateFormatMinuteFinal);
    console.log("timelineTimes: ", timelineTimes);
  }, [programs]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${url[basicUrlIndex]}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPrograms((prevPrograms) => {
          return [
            ...prevPrograms,
            {
              channels: data.channels,
              date: data.date,
              date_from: data.date_from,
              date_to: data.date_to,
              eveningStartTime: data.eveningStartTime,
            },
          ];
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [basicUrlIndex]);

  console.log("programs: ", programs);
  
  return (
    <>
      {/* <FilterList /> */}
      {programs.length > 0 && <Timeline onChangeApiFetch={scrollProgramsOnFetch} onChangeDelta={scrollPrograms} timelineTimes={timelineTimes} />}
      <div className={classes.channelsWrapper}>
        { isLoading && <Spinner /> }
        <div className={classes.logoContainer}>
          {programs.length > 0 &&
            programs.map((program, parentIndex) => program.channels.map((channel, index) => (<AllChannelLogo channel={channel} parentIndex={parentIndex} index={index} key={channel.id} id={channel.id} />)))}
        </div>
        <div ref={programsContainer} className={classes.programsContainer}>
          <Marker timelineTimes={timelineTimes} />
          {programs.length > 0 &&
            programs.map((program, index) => (
              <AllChannelPrograms programs={program} initData={initData} timelineTimes={timelineTimes} />
            ))}
        </div>
      </div>
      {programs.length > 0 && (
        <button onClick={urlIndexHandler}>
          Increse
        </button>
      )}
    </>
  );
};

export default AllChannelsList;
