import { useEffect, useRef } from "react";

import TimelineSection from "./TimelineSection";

import classes from "./Timeline.module.css";

const Timeline = (props) => {
  const container = useRef(null);
  let timelineArray = [];

  console.log("timelineProps: ", props.firstLast);

  const mouseWheelHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.current.scrollLeft += e.deltaY;
    props.onChangeDelta(e.deltaY);
  };

  const goLeft = () => {
    container.current.scrollLeft -= 100;
    props.onChangeDelta(-100);
  };
  const goRight = () => {
    container.current.scrollLeft += 100;
    props.onChangeDelta(100);
  };

  useEffect(() => {
    container.current.addEventListener("wheel", mouseWheelHandler, {
      passive: false,
    });
  }, []);

  // 30perc = 1800 second - unix
  // 30perc = 1800000 milisecond - generate new Date
  // 1800000 milisecond = 150px

  do {
    var incrementValue = props.firstLast.startTimestamp;
    const miliseconds = incrementValue * 1000;
    const endDateObject = new Date(miliseconds);
    const endDateFormatHour = endDateObject.toLocaleString("hu-HU", {
      hour: "numeric",
    });
    const endDateFormatMinute = endDateObject.toLocaleString("hu-HU", {
      minute: "numeric",
    });

    timelineArray.push({hour: endDateFormatHour, minute: endDateFormatMinute});
    incrementValue += 1800;
    
    console.log("timelineArray: ", timelineArray);
    console.log("incrementValue: ", incrementValue);
    console.log("props.firstLast.endTimestamp: ", props.firstLast.endTimestamp);
  } while (incrementValue === props.firstLast.endTimestamp);

  return (
    <div className={classes["timeline-wrapper"]}>
      <div className={classes["timeline-filter"]}></div>
      <button onClick={goLeft} className={`${classes["left-button"]} ${classes.buttons}`}>
        Le
      </button>
      <div ref={container} className={classes["section-wrapper"]}>
        <TimelineSection />
        <div className={classes.sections}>22:00</div>
        <div className={classes.sections}>22:30</div>
        <div className={classes.sections}>23:00</div>
        <div className={classes.sections}>23:30</div>
        <div className={classes.sections}>00:00</div>
        <div className={classes.sections}>00:30</div>
        <div className={classes.sections}>01:00</div>
        <div className={classes.sections}>01:30</div>
        <div className={classes.sections}>02:00</div>
        <div className={classes.sections}>02:30</div>
        <div className={classes.sections}>03:00</div>
        <div className={classes.sections}>03:30</div>
        <div className={classes.sections}>04:00</div>
        <div className={classes.sections}>04:30</div>
        <div className={classes.sections}>05:00</div>
        <div className={classes.sections}>05:30</div>
      </div>
      <button onClick={goRight} className={`${classes["right-button"]} ${classes.buttons}`}>
        Ri
      </button>
    </div>
  );
};

export default Timeline;
