import { useEffect, useRef, useState } from "react";

import TimelineSection from "./TimelineSection";

import classes from "./Timeline.module.css";

const Timeline = (props) => {
  const container = useRef(null);
  const [timeline, setTimeline] = useState([]);

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

  useEffect(() => {
    let incrementValue = props.firstLast.startTimestamp;

    do {
        const endDateObject = new Date(incrementValue);
        const endDateFormatHour = endDateObject.toLocaleString("hu-HU", {
          hour: "2-digit",
        });
        const endDateFormatMinute = endDateObject.toLocaleString("hu-HU", {
          minute: "2-digit",
          hour12: false
        });
        
        if (endDateFormatHour !== "Invalid Date" || !isNaN(endDateFormatHour)) {
            setTimeline((prevTimeline) => {
                return [...prevTimeline, { hour: endDateFormatHour, minute: endDateFormatMinute }];
            });
        }
        
        incrementValue += 1800000;

      } while (incrementValue <= props.firstLast.endTimestamp);

  }, [props.firstLast]);

  console.log("timeline: ", timeline);

  return (
    <div className={classes["timeline-wrapper"]}>
      <div className={classes["timeline-filter"]}></div>
      <button onClick={goLeft} className={`${classes["left-button"]} ${classes.buttons}`}>
        Le
      </button>
      <div ref={container} className={classes["section-wrapper"]}>
          {timeline.length !== 0 && timeline.map((item) => <TimelineSection time={item}/>)}
      </div>
      <button onClick={goRight} className={`${classes["right-button"]} ${classes.buttons}`}>
        Ri
      </button>
    </div>
  );
};

export default Timeline;
