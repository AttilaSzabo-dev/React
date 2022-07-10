import { useState, useEffect, useRef, useContext } from "react";
//import { useInView } from "react-intersection-observer";

import TvContext from "../../context/TvContext";

import AllChannelLogo from "./AllChannelLogo";
import AllChannelPrograms from "./AllChannelPrograms";
import Timeline from "../timeline-items/Timeline";
import Marker from "../timeline-items/Marker";
import Spinner from "../../UI/Spinner";

import classes from "./AllChannelsList.module.css";

const AllChannelsList = () => {
  const tvCtx = useContext(TvContext);
  const [timelineTimes, setTimelineTimes] = useState({
    startTimestamp: 0,
    endTimestamp: 0,
    startMinute: 0,
    startHour: 0,
    endMinute: 0,
    endHour: 0,
    firstProgramsStartTime: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const programsContainer = useRef(null);

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
    tvCtx.programs.forEach((item) => {
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
  }, [tvCtx.programs]);

  //console.log(tvCtx.programs.length);
  
  return (
    <>
      <Timeline onChangeApiFetch={scrollProgramsOnFetch} onChangeDelta={scrollPrograms} timelineTimes={timelineTimes} />
      <div className={classes.channelsWrapper}>
        {/* isLoading && <Spinner /> */}
        <div className={classes.logoContainer}>
          {
            tvCtx.programs.map((program, parentIndex) => program.channels.map((channel, index) => (<AllChannelLogo channel={channel} parentIndex={parentIndex} index={index} key={channel.id} id={channel.id} />)))}
        </div>
        <div ref={programsContainer} className={classes.programsContainer}>
          <Marker timelineTimes={timelineTimes} />
          {
            tvCtx.programs.map((program, index) => (
              <AllChannelPrograms programs={program} timelineTimes={timelineTimes} index={index} />
            ))}
        </div>
      </div>
      {/* {tvCtx.programs.length !== 0 && isLoading === false && (
        <button ref={ref} onClick={increseHandler}>
          Increse
        </button>
      )} */}
    </>
  );
};

export default AllChannelsList;
