import { useRef, useState } from "react";

import classes from "./Timeline.module.css";

const Timeline = () => {
  const container = useRef(null);
  const [timelinePosition, setTimelinePosition] = useState({
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  });

  const mouseDownHandler = function (e) {
    //ele.style.cursor = 'grabbing';
    //ele.style.userSelect = 'none';
    setTimelinePosition({
      left: container.scrollLeft,
      top: container.scrollTop,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - timelinePosition.x;
    const dy = e.clientY - timelinePosition.y;

    // Scroll the element
    setTimelinePosition({
        top: timelinePosition.top - dy,
        left: timelinePosition.left - dx

    });
    //container.scrollTop = timelinePosition.top - dy;
    //container.scrollLeft = timelinePosition.left - dx;
};

  return (
    <div className={classes["timeline-wrapper"]}>
      <div className={classes["timeline-filter"]}></div>
      <button className={`${classes["left-button"]} ${classes.buttons}`}>
        Le
      </button>
      <div
        ref={container}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)}
        className={classes["section-wrapper"]}
        style={{ left: timelinePosition.left, right: timelinePosition.right }}
      >
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
      <button className={`${classes["right-button"]} ${classes.buttons}`}>
        Ri
      </button>
    </div>
  );
};

export default Timeline;
