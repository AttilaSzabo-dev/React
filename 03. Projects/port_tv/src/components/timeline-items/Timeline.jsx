import { useContext, useEffect, useRef, useState } from "react";
import MarginContext from "../../context/MarginContext";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import ChannelFilter from "../filter-items/ChannelFilter";
import TimelineSection from "./TimelineSection";

import classes from "./Timeline.module.css";

const Timeline = ({
  onFilterChannels,
  initData,
  timelineTimes,
  introCb = () => {},
  introKey = {},
}) => {
  const container = useRef(null);
  const [timeline, setTimeline] = useState([]);
  const [categories, setCategories] = useState([]);
  const [timelineLength, setTimelineLength] = useState(0);
  const [init, setInit] = useState(true);
  const { marginLeftValue, setMarginLeftValue } = useContext(MarginContext);

  //******************************************** */
  const functionSelfName = "Timeline";
  const [introCalled, setIntroCalled] = useState(false);

  useEffect(() => {
    if (
      !introCalled &&
      typeof functionSelfName == "string" &&
      typeof introCb === "function" &&
      typeof introKey[functionSelfName] === "string"
    ) {
      setIntroCalled(true);
      introCb(introKey[functionSelfName]);
    }
  });

  //******************************************** */

  const gemiusHit = (checkGemiusId) => {
    if (
      typeof window.pp_gemius_hit === "function" &&
      typeof window.gemius_identifier === "string" &&
      typeof window.port_gemius_identifiers === "object"
    ) {
      //nyito gemius kod
      let sectionType = "tv-nyito";
      let code = window.port_gemius_identifiers[sectionType];
      if (checkGemiusId) {
        if (window.gemius_identifier !== code) {
          console.log("pp_gemius_hit", sectionType, code);
          window.pp_gemius_hit(code);
          window.gemius_identifier = "";
        }
      } else {
        console.log("pp_gemius_hit", sectionType, code);
        window.pp_gemius_hit(code);
      }
    }
  };

  const mouseWheelHandler = (e) => {
    /* e.preventDefault();
    e.stopPropagation();
    container.current.scrollLeft += e.deltaY;
    onChangeDelta(e.deltaY); */
  };

  const goLeft = () => {
    let goLeft = parseInt(marginLeftValue.marginLeft.replace("px", ""), 10);
    if (goLeft + 300 >= 0) {
      goLeft = 0;
    } else {
      goLeft += 300;
    }
    gemiusHit(false);
    setMarginLeftValue({
      marginLeft: goLeft + "px",
    });
  };

  const goRight = () => {
    let goRight = parseInt(marginLeftValue.marginLeft.replace("px", ""), 10);
   /*  if (condition) {
      
    } */
    goRight -= 300;
    /* console.log("timelineLength: ", timelineLength * 150);
    console.log("goRight: ", goRight); */
    gemiusHit(false);
    setMarginLeftValue({
      marginLeft: goRight + "px",
    });
  };

  const onSelectChange = (e) => {
    onFilterChannels(e.target.value);
  };

  useEffect(() => {
    if (init) {
      const newPos = -((timelineTimes.actualTime - timelineTimes.startTimestamp / 1000) / 12);

      setMarginLeftValue({
        marginLeft: newPos + 300 + "px",
      });
      setInit(false);
    }
  }, [timelineTimes]);

  useEffect(() => {
    let groups = Object.values(initData.channelGroups);
    setCategories(groups);
  }, [initData.channelGroups]);

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
    let allIncrementValue = 0;
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
      allIncrementValue += 1
    } while (incrementValue <= timelineTimes.endTimestamp - 1800000);
    setTimelineLength(allIncrementValue);
  }, [timelineTimes]);

  return (
    <div className={classes.timelineWrapper}>
      <div className={classes.timelineFilter}>
        <ChannelFilter
          categories={categories}
          onSelectChange={onSelectChange}
        />
      </div>
      <button onClick={goLeft} className={`${classes.buttons} introjsTimelineButtonLeft`}>
        <MdKeyboardArrowLeft className={classes.arrows} />
      </button>
      <div ref={container} className={classes.sectionWrapper}>
        <div style={marginLeftValue} className={classes.marginWrapper}>
          {timeline.length !== 0 &&
            timeline.map((item) => <TimelineSection time={item} />)}
        </div>
      </div>
      <button onClick={goRight} className={`${classes.buttons} introjsTimelineButtonRight`}>
        <MdKeyboardArrowRight className={classes.arrows} />
      </button>
    </div>
  );
};

export default Timeline;
