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
    roundedActualTime: 0,
    timelineTimes: [],
    mobileChannelsAll: [],
    mobileChannelsShow: [],
  });
  const { filterValues, setFilterValues } = useContext(FilterContext);
  const [isLoading, setIsLoading] = useState(false);

  //mi kell a mobileData-ból: date(hogy tudjuk az aktuális időt) / channelsből: id, logo, name, url / programsból: end_datetime, end_time, film_url, start_datetime, start_time, title

  const createListToShow = (data) => {
    let update = [];
    let updateShort = [];
    let today = data.date.replace("T", " ");
    const date = new Date(today);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    date.setMinutes(0);
    date.setSeconds(0);
    const unixTimestampModified = Math.floor(date.getTime() / 1000);
    //const milliseconds = unixTimestamp * 1000;
    //const dateObject = new Date(milliseconds);
    //const convertToFullTime = dateObject.toLocaleString("hu-HU");
    data.channels.forEach((channel) => {
      let indexHelper = 0;
      let useIndex = false;
      const channelObject = {
        id: channel.id,
        logo: channel.logo,
        name: channel.name,
        url: channel.url,
        programs: [],
      };
      const channelObjectFinal = {
        id: channel.id,
        logo: channel.logo,
        name: channel.name,
        url: channel.url,
        programs: [],
      };
      channel.programs.forEach((program, index) => {
        const dateStart = new Date(program.start_datetime);
        const unixTimestampStart = Math.floor(dateStart.getTime() / 1000);
        const dateEnd = new Date(program.end_datetime);
        const unixTimestampEnd = Math.floor(dateEnd.getTime() / 1000);
        const programObject = {
          start_datetime: unixTimestampStart,
          start_time: program.start_time,
          end_datetime: unixTimestampEnd,
          end_time: program.end_time,
          film_url: program.film_url,
          title: program.title,
        };
        channelObject.programs.push(programObject);
        if (
          unixTimestampStart < unixTimestamp &&
          unixTimestampEnd > unixTimestamp
        ) {
          channelObjectFinal.programs.push(programObject);
          indexHelper = index;
          useIndex = true;
        }
        if (useIndex && index <= indexHelper + 2 && index !== indexHelper) {
          channelObjectFinal.programs.push(programObject);
        }
      });
      update.push(channelObject);
      updateShort.push(channelObjectFinal);
    });

    setListToShow((prev) => ({
      ...prev,
      actualTime: unixTimestamp,
      roundedActualTime: unixTimestampModified,
      mobileChannelsAll: [...prev.mobileChannelsAll, update],
      mobileChannelsShow: [...prev.mobileChannelsShow, updateShort],
    }));
    console.log("unixTimestamp: ", unixTimestamp);
    console.log("unixTimestampModified: ", unixTimestampModified);
    //console.log("update: ", update);
    //console.log("updateShort: ", updateShort);
    console.log("mobileData: ", data);
    //console.log("mobileDataDateTS: ", unixTimestamp);
    //console.log("mobileDataDataReverse: ", humanDateFormat);
  };
  console.log("listToShow: ", listToShow);
  console.log("filterValues: ", filterValues);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${url[urlIndex]}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        createListToShow(data);
        setIsLoading(false);
      })
      .catch((error) => {
        //setError(error.message);
      });
  }, [urlIndex]);

  useEffect(() => {
    if (listToShow.mobileChannelsAll.length !== 0) {
      let startTime = [];
      let endTime = [];
      listToShow.mobileChannelsAll.forEach((group) => {
        group.forEach((channels) => {
          startTime.push(channels.programs[0].start_datetime);
          endTime.push(
            channels.programs[channels.programs.length - 1].end_datetime
          );
        });
      });
      const minStart = Math.min(...startTime);
      const minMilliseconds = minStart * 1000;
      const minDateObject = new Date(minMilliseconds);
      //const testStartTimeBefore = minDateObject.toLocaleString("hu-HU");
      minDateObject.setMinutes(0);
      minDateObject.setSeconds(0);
      //const testStartTimeAfter = minDateObject.toLocaleString("hu-HU");
      const startUnixTimestamp = Math.floor(minDateObject.getTime() / 1000);

      const minEnd = Math.min(...endTime);
      const maxMilliseconds = minEnd * 1000;
      const maxDateObject = new Date(maxMilliseconds);
      //const testEndTimeBefore = maxDateObject.toLocaleString("hu-HU");
      //const maxHour = maxDateObject.toLocaleString("hu-HU", {hour: "numeric"});
      //console.log("maxHour: ", maxHour);
      //console.log("maxHour: ", parseInt(maxHour, 10) + 1);
      //maxDateObject.setHours(parseInt(maxHour, 10) + 1);
      maxDateObject.setMinutes(0);
      maxDateObject.setSeconds(0);
      //const testEndTimeAfter = maxDateObject.toLocaleString("hu-HU");
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
    }
  }, [listToShow.mobileChannelsAll]);

  const updateListToShow = (timestampValue) => {
    let updateShort = [];
    const unixTimestampModified = timestampValue;

    listToShow.mobileChannelsAll.forEach((group) => {
      let groupArray = [];
      group.forEach((channel) => {
        let indexHelper = 0;
        let useIndex = false;
        const channelObject = {
          id: channel.id,
          logo: channel.logo,
          name: channel.name,
          url: channel.url,
          programs: [],
        };
        channel.programs.forEach((program, index) => {
          const unixTimestampStart = program.start_datetime;
          const unixTimestampEnd = program.end_datetime;
          const programObject = {
            start_datetime: unixTimestampStart,
            start_time: program.start_time,
            end_datetime: unixTimestampEnd,
            end_time: program.end_time,
            film_url: program.film_url,
            title: program.title,
          };

          if (
            unixTimestampStart < unixTimestampModified &&
            unixTimestampEnd > unixTimestampModified
          ) {
            channelObject.programs.push(programObject);
            indexHelper = index;
            useIndex = true;
          }
          if (useIndex && index <= indexHelper + 2 && index !== indexHelper) {
            channelObject.programs.push(programObject);
          }
        });
        groupArray.push(channelObject);
      });
      updateShort.push(groupArray);
    });

    setListToShow((prev) => ({
      ...prev,
      mobileChannelsShow: updateShort
    }));
  };

  const selectTimeHandler = (e) => {
    const attr = e.currentTarget.attributes;
    console.log(attr[0].value);
    setListToShow((prev) => ({
      ...prev,
      roundedActualTime: parseInt(attr[0].value, 10)
    }));
    updateListToShow(parseInt(attr[0].value, 10));
  };

  const timeHandlerLeft = () => {
    setListToShow((prev) => ({
      ...prev,
      roundedActualTime: listToShow.roundedActualTime - 3600
    }));
    updateListToShow(listToShow.roundedActualTime - 3600);
  };

  const timeHandlerRight = () => {
    setListToShow((prev) => ({
      ...prev,
      roundedActualTime: listToShow.roundedActualTime + 3600
    }));
    updateListToShow(listToShow.roundedActualTime + 3600);
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
                item.timestamp >= listToShow.roundedActualTime - 7200 &&
                item.timestamp <= listToShow.roundedActualTime + 7200
                  ? ""
                  : classes.hide
              } ${
                item.timestamp === listToShow.roundedActualTime
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
                <div key={channel.id} className={classes.channelWrapper}>
                  <div className={classes.logoWrapper}>
                    <img src={channel.logo} alt={channel.id} />
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
                          width:
                            100 -
                            ((channel.programs[0].end_datetime -
                              listToShow.roundedActualTime) /
                              (channel.programs[0].end_datetime -
                                channel.programs[0].start_datetime)) *
                              100 +
                            "%",
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
                      .toLowerCase()}/${channel.id}`}
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
