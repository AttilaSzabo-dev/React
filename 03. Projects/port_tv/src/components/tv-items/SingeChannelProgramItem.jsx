import { useState, useEffect, useContext } from "react";

import TvDataContext from "../../context/TvDataContext";

import { BsEnvelope } from 'react-icons/bs';
import { BsClock } from 'react-icons/bs';

import classes from "./SingeChannelProgramItem.module.css";

const SingeChannelProgramItem = ({notificId, reminderId, startTime, startTs, title, filmUrl, description}) => {

  const { tvData, setTvData } = useContext(TvDataContext);
  const [notiStatus, setNotiStatus] = useState(false);
  const [remindStatus, setRemindStatus] = useState(false);
  const [hover, setHover] = useState(false);

  const visible = {
    opacity: 1,
    pointerEvents: "all"
  };

  const notVisible = {
    opacity: 0,
    pointerEvents: "none"
  };

  const toggleHover = () => {
    setHover(!hover);
  };

  const setNotiHandler = () => {
    setTvData((prevData) => ({
      ...prevData, 
      notifications: {...prevData.notifications, [notificId]: 1}
      })
    );
  }
  const setRemindHandler = () => {
    setTvData((prevData) => ({
      ...prevData, 
      reminders: {...prevData.reminders, [reminderId]: 1}
      })
    );
  }

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
    <div onMouseLeave={toggleHover} onMouseEnter={toggleHover} className={classes.programItem}>
      <div className={classes.time}>{startTime}
        <div className={classes.noti}>
          <BsEnvelope onClick={setRemindHandler} className={`${classes.envelope} ${remindStatus ? classes.active : ""}`} style={hover ? visible : notVisible} title="Kérek értesítőt" />
          <BsClock onClick={setNotiHandler} className={`${classes.clock} ${notiStatus ? classes.active : ""}`} style={hover ? visible : notVisible} title="Emlékeztető beállítása" />
        </div>
      </div>
      <a href={filmUrl} className={classes.title}>{title}</a>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default SingeChannelProgramItem;
