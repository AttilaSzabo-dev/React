import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import TimelineSection from "./TimelineSection";

import classes from "./Timeline.module.css";

const Timeline = ({ onChangeDelta, onChangeApiFetch, onFilterChannels, initData, timelineTimes }) => {
  const container = useRef(null);
  const [timeline, setTimeline] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log("timeline render");
  console.log("timelineTimes: ", timelineTimes);

  const mouseWheelHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.current.scrollLeft += e.deltaY;
    onChangeDelta(e.deltaY);
  };

  const goLeft = () => {
    container.current.scrollLeft -= 150;
    onChangeDelta(-150);
  };
  const goRight = () => {
    if (
      container.current.scrollWidth - container.current.scrollLeft ===
      container.current.offsetWidth
    ) {
      console.log("END scrollWidth: ", container.current.scrollWidth);
      console.log("END scrollLeft: ", container.current.scrollLeft);
      console.log(
        "END scrollWidth - scrollLeft: ",
        container.current.scrollWidth - container.current.scrollLeft
      );
      console.log("END offsetWidth: ", container.current.offsetWidth);
      return false;
    } else {
      container.current.scrollLeft += 150;
      console.log("scrollWidth: ", container.current.scrollWidth);
      console.log("scrollLeft: ", container.current.scrollLeft);
      console.log(
        "scrollWidth - scrollLeft: ",
        container.current.scrollWidth - container.current.scrollLeft
      );
      console.log("offsetWidth: ", container.current.offsetWidth);
      //TODO lehetséges megoldás:
      //onChangeDelta(container.current.scrollLeft);
      onChangeDelta(150);
    }
  };

  const onSelectChange = (e) => {
    //const event = e.target.value;
    onFilterChannels(e.target.value);
    console.log("item: ", e.target.value);
  };
  
  useEffect(() => {
    if (timelineTimes.startTimestamp > 0) {
      const newPos =
        (Math.floor(new Date(initData.date).getTime()) -
          timelineTimes.startTimestamp) /
        12000;
      //container.current.scrollLeft += newPos;

      //TODO: lassab gépeken vagy neten nem jelenik meg a konténer időben ezért nem tud scrollozódni (egyenlőre timeout a megoldás)
      setTimeout(() => {
        container.current.scrollTo({
          top: 0,
          left: newPos - 300,
          behavior: "smooth",
        });
        onChangeApiFetch(newPos - 300);
      }, 10);

      let groups = Object.values(initData.channelGroups);
      setCategories(groups);
    }
  }, [initData, timelineTimes, onChangeApiFetch]);

  console.log("categories out: ", categories);

  useEffect(() => {
    container.current.addEventListener("wheel", mouseWheelHandler, {
      passive: false,
    });
  });

  // 30perc = 1800 second - unix
  // 30perc = 1800000 milisecond - generate new Date
  // 1800000 milisecond = 150px

  useEffect(() => {
    let incrementValue = timelineTimes.startTimestamp;
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
    } while (incrementValue <= timelineTimes.endTimestamp - 1800000);
  }, [timelineTimes]);

  //console.log("timeline: ", timeline);

  return (
    <div className={classes["timeline-wrapper"]}>
      <div className={classes["timeline-filter"]}>
        {<select
          className={classes.select}
          name="selectList"
          id="selectList"
          onChange={(e) => onSelectChange(e)}
        >
          <option value="0">Összes csatorna</option>
          {categories.length > 0 && categories.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>}
      </div>
      <button
        onClick={goLeft}
        className={`${classes["left-button"]} ${classes.buttons}`}
      >
        <MdKeyboardArrowLeft className={classes.arrows} />
      </button>
      <div ref={container} className={classes["section-wrapper"]}>
        {timeline.length !== 0 &&
          timeline.map((item) => <TimelineSection time={item} />)}
      </div>
      <button
        onClick={goRight}
        className={`${classes["right-button"]} ${classes.buttons}`}
      >
        <MdKeyboardArrowRight className={classes.arrows} />
      </button>
    </div>
  );
};

export default Timeline;
