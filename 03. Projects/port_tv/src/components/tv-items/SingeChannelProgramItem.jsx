import { useState, useEffect, useContext } from "react";

import TvDataContext from "../../context/TvDataContext";
import FilterContext from "../../context/FilterContext";

import { BsEnvelope } from "react-icons/bs";
import { BsClock } from "react-icons/bs";

import classes from "./SingeChannelProgramItem.module.css";

const SingeChannelProgramItem = ({
  notificId,
  reminderId,
  startTime,
  startTs,
  title,
  filmUrl,
  description,
  restriction
}) => {
  const { tvData, setTvData, csrf } = useContext(TvDataContext);
  const { filterValues } = useContext(FilterContext);
  const [notiStatus, setNotiStatus] = useState(false);
  const [remindStatus, setRemindStatus] = useState(false);
  const [hover, setHover] = useState(false);
  const [activeProgram, setActiveProgram] = useState(false);

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

  const setNotiHandler = () => {
    if (notiStatus) {
      setTvData((currentData) => {
        const copy = { ...currentData };
        delete copy["notifications"][notificId];
        return copy;
      });
    } else {
      setTvData((prevData) => ({
        ...prevData,
        notifications: { ...prevData.notifications, [notificId]: 1 },
      }));
    }
    setNotiStatus(!notiStatus);
    sendData(true);
  };
  const setRemindHandler = () => {
    if (remindStatus) {
      setTvData((currentData) => {
        const copy = { ...currentData };
        delete copy["reminders"][reminderId];
        return copy;
      });
    } else {
      setTvData((prevData) => ({
        ...prevData,
        reminders: { ...prevData.reminders, [reminderId]: 1 },
      }));
    }
    setRemindStatus(!remindStatus);
    sendData(false);
  };

  const sendData = (select) => {
    let selector = "";
    let entity = "entity_id="
    if (select) {
      selector = "notification-toggle";
      entity += notificId;
    }else {
      selector = "reminder-toggle";
      entity += reminderId
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
    for (const key in tvData.notifications) {
      if (key === notificId) {
        setNotiStatus(true);
      }
    }

    for (const key in tvData.reminders) {
      if (key === reminderId) {
        setRemindStatus(true);
      }
    }
  }, [tvData.notifications, tvData.reminders, notificId, reminderId]);

  return (
    <div
      onMouseLeave={toggleHover}
      onMouseEnter={toggleHover}
      className={`${classes.programItem} ${activeProgram ? classes.highlight : ""}`}
    >
      <div className={classes.time}>
        {startTime}
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
            className={`${classes.clock} ${notiStatus ? classes.active : ""}`}
            style={hover ? visible : notVisible}
            title="Emlékeztető beállítása"
          />
        </div>
      </div>
      <a href={filmUrl} target="_blank" rel="noreferrer" className={classes.title}>
        {title}
      </a>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default SingeChannelProgramItem;
