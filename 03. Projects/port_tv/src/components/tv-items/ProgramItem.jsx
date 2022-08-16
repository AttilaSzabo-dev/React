import { useContext, useEffect, useState } from "react";

import TvDataContext from "../../context/TvDataContext";
import FilterContext from "../../context/FilterContext";

import { BsEnvelope } from "react-icons/bs";
import { BsClock } from "react-icons/bs";

import classes from "./ProgramItem.module.css";

const ProgramItem = ({
  notificId,
  reminderId,
  actualTime,
  start_time,
  start_unixtime,
  end_time,
  end_unixtime,
  title,
  filmUrl,
  short_description,
  restriction
}) => {
  const { tvData, setTvData, csrf } = useContext(TvDataContext);
  const { filterValues } = useContext(FilterContext);
  const [notiStatus, setNotiStatus] = useState(false);
  const [remindStatus, setRemindStatus] = useState(false);
  const [hover, setHover] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [activeProgram, setActiveProgram] = useState(false);
  const background =
  start_unixtime > actualTime
      ? "#fff"
      : "#f3f3f3";
  const widthCalc =
  (end_unixtime - start_unixtime) / 12 +
    "px";

  const addCss = {
    minWidth: widthCalc,
    maxWidth: widthCalc,
    backgroundColor: background,
  };

  const popUpCss = {
    left: (widthCalc.replace('px', '') / 2 - 130) + "px"
  };

  const visible = {
    opacity: 1,
    pointerEvents: "all",
  };

  const notVisible = {
    opacity: 0,
    pointerEvents: "none",
  };

  const programFilterDict = {
    film: ['documentary','dokumentumfilm','film'],
    sorozat: ['filmsorozat','series'],
    sport: ['sportmusor','sports'],
    sportLive: [],
    reality: ['reality-musor','reality-show'],
    gastro: ['cooking','gasztronomiai-musor']
  };

  const toggleHover = () => {
    setHover(!hover);
  };

  const togglePopUp = () => {
    setPopUp(!popUp);
  };

  const setNotiHandler = () => {
    if (notiStatus) {
      const filteredFavorite = tvData.notifications.filter(
        (removeId) => removeId !== notificId
      );
      setTvData((prevData) => ({
        ...prevData,
        notifications: filteredFavorite,
      }));
    } else {
      setTvData((prevData) => ({
        ...prevData,
        notifications: [...prevData.notifications, notificId],
      }));
    }
    setNotiStatus(!notiStatus);
    sendData(true);
  };
  const setRemindHandler = () => {
    if (remindStatus) {
      const filteredFavorite = tvData.reminders.filter(
        (removeId) => removeId !== reminderId
      );
      setTvData((prevData) => ({
        ...prevData,
        reminders: filteredFavorite,
      }));
    } else {
      setTvData((prevData) => ({
        ...prevData,
        reminders: [...prevData.reminders, reminderId],
      }));
    }
    setRemindStatus(!remindStatus);
    sendData(false);
  };

  const sendData = (select) => {
    let selector = "";
    let entity = "entity_id=";
    if (select) {
      selector = "notification-toggle";
      entity += notificId;
    } else {
      selector = "reminder-toggle";
      entity += reminderId;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/felhasznalo/portam/" + selector + "", true);
    xhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    xhttp.setRequestHeader("X-CSRF-Token", csrf);
    xhttp.send(entity);
  };

  useEffect(()=>{
    let allFilters = [];
    filterValues.programFilter.forEach((filter)=> {
      allFilters.push(...programFilterDict[filter]);
    });
    if (allFilters.includes(restriction.category)) {
      setActiveProgram(true);
    }else {
      setActiveProgram(false);
    }
  },[filterValues]);

  useEffect(() => {
    if (tvData.notifications.includes(notificId)) {
      setNotiStatus(true);
    }

    if (tvData.reminders.includes(reminderId)) {
      setRemindStatus(true);
    }
  }, [tvData.notifications, tvData.reminders, notificId, reminderId]);

  return (
    <div
      onMouseLeave={togglePopUp}
      onMouseEnter={togglePopUp}
      className={classes.programHoverContainer}
    >
      <div className={`${classes.hoverInfoContainer} ${popUp ? classes.show : ""}`} style={popUpCss}>
        <span className={classes.title}>{title} <span className={classes.time}>{`(${start_time} - ${end_time})`}</span></span>
        
        <span className={classes.desc}>{short_description}</span>
      </div>
      <div
        onMouseLeave={toggleHover}
        onMouseEnter={toggleHover}
        className={`${classes.programItem} ${activeProgram ? classes.highlight : ""}`}
        style={addCss}
      >
        <div className={classes.time}>
          {`${start_time} - ${end_time}`}
          <div className={classes.noti}>
            <BsEnvelope
              onClick={setRemindHandler}
              className={`${classes.envelope} ${
                remindStatus ? classes.active : ""
              }`}
              style={hover ? visible : notVisible}
              title="Kérek értesítőt"
            />
            <BsClock
              onClick={setNotiHandler}
              className={`${classes.clock} ${
                notiStatus ? classes.active : ""
              }`}
              style={hover ? visible : notVisible}
              title="Emlékeztető beállítása"
            />
          </div>
        </div>
        <a href={filmUrl} target="_blank" rel="noreferrer" className={classes.title}>
          {title}
        </a>
      </div>
    </div>
  );
};

export default ProgramItem;
