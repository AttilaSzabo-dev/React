import { useContext, useEffect, useRef, useState } from "react";
import MarginContext from "../../context/MarginContext";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import TimelineSection from "./TimelineSection";

import classes from "./Timeline.module.css";

const Timeline = ({
  onFilterChannels,
  initData,
  timelineTimes,
}) => {
  const container = useRef(null);
  const [timeline, setTimeline] = useState([]);
  const [categories, setCategories] = useState([]);
  const { marginLeftValue, setMarginLeftValue } = useContext(MarginContext);

  const mouseWheelHandler = (e) => {
    /* e.preventDefault();
    e.stopPropagation();
    container.current.scrollLeft += e.deltaY;
    onChangeDelta(e.deltaY); */
  };

  const goLeft = () => {
    let goLeft = parseInt(marginLeftValue.marginLeft.replace("px", ""), 10);
    goLeft += 300;
    setMarginLeftValue({
      marginLeft: goLeft + "px",
    });
  };

  const goRight = () => {
    let goRight = parseInt(marginLeftValue.marginLeft.replace("px", ""), 10);
    goRight -= 300;
    setMarginLeftValue({
      marginLeft: goRight + "px",
    });
  };

  const onSelectChange = (e) => {
    onFilterChannels(e.target.value);
  };

  useEffect(() => {
    if (timelineTimes.startTimestamp > 0) {
      const newPos = -(
        (Math.floor(new Date(initData.date).getTime()) -
          timelineTimes.startTimestamp) /
        12000
      );

      setMarginLeftValue({
        marginLeft: newPos + 300 + "px",
      });

      //TODO: lassab gépeken vagy neten nem jelenik meg a konténer időben ezért nem tud scrollozódni (egyenlőre timeout a megoldás)
      /* setTimeout(() => {
        container.current.scrollTo({
          top: 0,
          left: newPos - 300,
          behavior: "smooth",
        });
      }, 10); */

      let groups = Object.values(initData.channelGroups);
      setCategories(groups);
    }
  }, [initData, timelineTimes]);

  useEffect(() => {
    /* container.current.addEventListener("wheel", mouseWheelHandler, {
      passive: false,
    }); */
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

  return (
    <div className={classes.timelineWrapper}>
      <div className={classes.timelineFilter}>
        {
          <select
            className={classes.select}
            name="selectList"
            id="selectList"
            onChange={(e) => onSelectChange(e)}
          >
            <option value="0">Összes csatorna</option>
            {categories.length > 0 &&
              categories.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
          </select>
        }
      </div>
      <button onClick={goLeft} className={classes.buttons}>
        <MdKeyboardArrowLeft className={classes.arrows} />
      </button>
      <div ref={container} className={classes.sectionWrapper}>
        <div style={marginLeftValue} className={classes.marginWrapper}>
          {timeline.length !== 0 &&
            timeline.map((item) => <TimelineSection time={item} />)}
        </div>
      </div>
      <button onClick={goRight} className={classes.buttons}>
        <MdKeyboardArrowRight className={classes.arrows} />
      </button>
    </div>
  );
};

export default Timeline;
