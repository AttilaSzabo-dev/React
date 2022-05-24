import { useEffect, useRef, useState } from "react";

import TimelineSection from "./TimelineSection";

import classes from "./Timeline.module.css";

const Timeline = (props) => {
  const container = useRef(null);
  const scrollContainer = useRef(null);
  const [timeline, setTimeline] = useState([]);

  console.log("timelineProps: ", props.firstLast);

  // TODO: oda mozgatjuk a markert ami az aktuális idő scrollTo(x-coord, y-coord) https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
  const mouseWheelHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(container.current.scrollLeft + scrollContainer.current.offsetWidth) <= scrollContainer.current.scrollWidth || !(container.current.scrollLeft + scrollContainer.current.offsetWidth) >= scrollContainer.current.scrollWidth){
      container.current.scrollLeft += e.deltaY;
      props.onChangeDelta(e.deltaY);
      console.log("scroll vége");
    }
  };

  const goLeft = () => {
    if (!(container.current.scrollLeft + scrollContainer.current.offsetWidth) <= scrollContainer.current.scrollWidth){
      container.current.scrollLeft -= 100;
      props.onChangeDelta(-100);
      console.log("scroll vége");
    }
  };
  const goRight = () => {
    if ((container.current.scrollLeft + scrollContainer.current.offsetWidth) <= scrollContainer.current.scrollWidth){
      container.current.scrollLeft += 100;
      props.onChangeDelta(100);
      console.log("scroll vége");
    }
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
    setTimeline([]);

    do {
      const endDateObject = new Date(incrementValue);
      const endDateFormatHour = endDateObject.toLocaleString("hu-HU", {
        hour: "2-digit",
      });
      const endDateFormatMinute = endDateObject.toLocaleString("hu-HU", {
        minute: "2-digit",
        hour12: false,
      });

      if (endDateFormatHour !== "Invalid Date" || !isNaN(endDateFormatHour)) {
        setTimeline((prevTimeline) => {
          return [
            ...prevTimeline,
            { hour: endDateFormatHour, minute: endDateFormatMinute },
          ];
        });
      }

      incrementValue += 1800000;
    } while (incrementValue <= props.firstLast.endTimestamp);
  }, [props.firstLast]);

  console.log("timeline: ", timeline);

  return (
    <div ref={scrollContainer} className={classes["timeline-wrapper"]}>
      <div className={classes["timeline-filter"]}></div>
      <button
        onClick={goLeft}
        className={`${classes["left-button"]} ${classes.buttons}`}
      >
        Le
      </button>
      <div ref={container} className={classes["section-wrapper"]}>
        {timeline.length !== 0 &&
          timeline.map((item) => <TimelineSection time={item} />)}
      </div>
      <button
        onClick={goRight}
        className={`${classes["right-button"]} ${classes.buttons}`}
      >
        Ri
      </button>
    </div>
  );
};

export default Timeline;
