import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

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
    timelineTimes: [],
    mobileChannelsAll: [],
    mobileChannelsShow: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  //mi kell a mobileData-ból: date(hogy tudjuk az aktuális időt) / channelsből: id, logo, name, url / programsból: end_datetime, end_time, film_url, start_datetime, start_time, title

  const createListToShow = (data) => {
    let update = [];
    let updateShort = [];
    let today = data.date.replace("T", " ");
    const date = new Date(today);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString("hu-HU");
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
      mobileChannelsAll: [...prev.mobileChannelsAll, update],
      mobileChannelsShow: [...prev.mobileChannelsShow, updateShort],
    }));
    //setActualTimeDate(unixTimestamp);
    console.log("update: ", update);
    console.log("updateShort: ", updateShort);
    console.log("mobileData: ", data);
    console.log("mobileDataDateTS: ", unixTimestamp);
    console.log("mobileDataDataReverse: ", humanDateFormat);
  };
  console.log("listToShow: ", listToShow);

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
      const testStartTimeBefore = minDateObject.toLocaleString("hu-HU");
      minDateObject.setMinutes(0);
      minDateObject.setSeconds(0);
      const testStartTimeAfter = minDateObject.toLocaleString("hu-HU");
      const startUnixTimestamp = Math.floor(minDateObject.getTime() / 1000);

      const minEnd = Math.min(...endTime);
      const maxMilliseconds = minEnd * 1000;
      const maxDateObject = new Date(maxMilliseconds);
      const testEndTimeBefore = maxDateObject.toLocaleString("hu-HU");
      //const maxHour = maxDateObject.toLocaleString("hu-HU", {hour: "numeric"});
      //console.log("maxHour: ", maxHour);
      //console.log("maxHour: ", parseInt(maxHour, 10) + 1);
      //maxDateObject.setHours(parseInt(maxHour, 10) + 1);
      maxDateObject.setMinutes(0);
      maxDateObject.setSeconds(0);
      const testEndTimeAfter = maxDateObject.toLocaleString("hu-HU");
      const endUnixTimestamp = Math.floor(maxDateObject.getTime() / 1000);

      console.log("timestamp before: ", minEnd);
      console.log("timestamp after: ", endUnixTimestamp);

      console.log("testStartTimeBefore: ", testStartTimeBefore);
      console.log("testStartTimeAfter: ", testStartTimeAfter);
      console.log("testEndTimeBefore: ", testEndTimeBefore);
      console.log("testEndTimeAfter: ", testEndTimeAfter);

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

  return (
    <div>
      {isLoading && <Spinner />}
      <div className={classes.timelineWrapper}>
        <button className={classes.timelineButton}>
          <MdKeyboardArrowLeft className={classes.timelineArrow} />
        </button>
        <button className={classes.timelineButton}>
          <MdKeyboardArrowRight className={classes.timelineArrow} />
        </button>
        {/* {listToShow.timelineTimes.map(item => ({
          item.timestamp 
        }))} */}
      </div>
      <AdFejlecCsik />
      {listToShow.mobileChannelsShow.length !== 0 && listToShow.mobileChannelsShow.map((group, outerIndex) =>
        group.map((channel, innerIndex) => (
          <>
            {outerIndex === 0 && innerIndex === 2 && <AdLB />}
            {outerIndex === 0 && innerIndex === 6 && <AdRich />}
            {outerIndex === 0 && innerIndex === 10 && <AdRB />}
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
                          listToShow.actualTime) /
                          (channel.programs[0].end_datetime -
                            channel.programs[0].start_datetime)) *
                          100 +
                        "%",
                    }}
                  ></div>
                </div>
                {channel.programs[1] !== undefined && <span
                  className={classes.text}
                >{`${channel.programs[1].start_time} ${channel.programs[1].title}`}</span>}
                {channel.programs[2] !== undefined && <span
                  className={classes.text}
                >{`${channel.programs[2].start_time} ${channel.programs[2].title}`}</span>}
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
          </>
        ))
      )}
    </div>
  );
};

export default AllChannelMobile;
