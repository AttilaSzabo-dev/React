import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";

import AllChannelLogo from "./AllChannelLogo";
import AllChannelPrograms from "./AllChannelPrograms";
import Spinner from "../../UI/Spinner";

import classes from "./AllChannelsList.module.css";
import Timeline from "../../UI/Timeline";

const AllChannelsList = ({ tvEventInit }) => {
  const [programs, setPrograms] = useState([]);
  const [timelineTimes, setTimelineTimes] = useState({
    startTimestamp: 0,
    endTimestamp: 0,
    startMinute: 0,
    startHour: 0,
    endMinute: 0,
    endHour: 0,
    firstProgramsStartTime: []
  });
  const [actualUrlsIndex, setActualUrlsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const programsContainer = useRef(null);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    trackVisibility: true,
    delay: 100,
  });

  const pluck = (array, key) => {
    return array.map((item) => item[key]);
  };

  function* chunk(array, n) {
    for (let index = 0; index < array.length; index += n) {
      yield array.slice(index, index + n);
    }
  }

  const fetchActualUrl = useCallback(
    (urls) => {
      setIsLoading(true);
      fetch(`${urls[actualUrlsIndex]}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("apiFetch: ", data);
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
    },
    [actualUrlsIndex]
  );

  const increseHandler = () => {
    if (programs.length === actualUrlsIndex) return false;

    setActualUrlsIndex(actualUrlsIndex + 1);
  };

  if (inView) {
    increseHandler();
  }

  /* let content = <p></p>;

  if (false) {
    content = <AllChannelsList allProgram={tvEventInit} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  } */

  console.log("tároló state: ", programs);
  //console.log(inView);

  const scrollPrograms = (value) => {
    //console.log("testValue: ", value);
    programsContainer.current.scrollLeft += value;
  };

  // 30perc = 1800 second
  // 30perc = 1800000 milisecond
  // 1800000 milisecond = 150px

  useEffect(() => {
    //TODO : csekkolni ha az új starttime vagy endtime nagyobb mint az előző és mindig a legkisebbet kell megtartani
    let startTime = [];
    let endTime = [];
    programs.forEach((item) => {
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

    console.log("endTime: ", endTime);

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
  }, [programs]);

  useEffect(() => {
    let date = `date=${tvEventInit.date.split("T")[0]}`;
    let ids = pluck(tvEventInit.channels, "id");
    let chunks = [...chunk(ids, 40)];
    let urls = chunks.map((chunk) => {
      let channels = chunk.map((id) => `channel_id%5B%5D=${id}`).join("&");
      return `tv-event/api?${channels}&${date}`;
    });

    //console.log("ids: ", ids);
    //console.log("chunks: ", chunks);
    //console.log("urls: ", urls);

    fetchActualUrl(urls);
  }, [fetchActualUrl, tvEventInit.date, tvEventInit.channels]);

  return (
    <>
      {programs.length !== 0 && (
        <Timeline onChangeDelta={scrollPrograms} firstLast={timelineTimes} />
      )}
      <div className={classes.channelsWrapper}>
        {isLoading && <Spinner />}
        <div className={classes.logoContainer}>
          {programs.length !== 0 &&
            programs.map((program) => <AllChannelLogo programs={program} />)}
        </div>
        <div ref={programsContainer} className={classes.programsContainer}>
          {programs.length !== 0 &&
            programs.map((program) => (
              <AllChannelPrograms programs={program} timelineTimes={timelineTimes} />
            ))}
        </div>
      </div>
      {programs.length !== 0 && isLoading === false && (
        <button ref={ref} onClick={increseHandler}>
          Increse
        </button>
      )}
    </>
  );
};

export default AllChannelsList;
