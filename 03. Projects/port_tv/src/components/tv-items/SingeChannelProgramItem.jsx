import { useState, useEffect, useContext } from "react";

import TvDataContext from "../../context/TvDataContext";

import { BsEnvelope } from 'react-icons/bs';
import { BsClock } from 'react-icons/bs';

import classes from "./SingeChannelProgramItem.module.css";

const SingeChannelProgramItem = ({notificId, reminderId, startTime, startTs, title, filmUrl, description}) => {
  const { tvData, setTvData } = useContext(TvDataContext);
  const [hover, setHover] = useState(false);

  const notiVisible = {
    opacity: 1,
    pointerEvents: "all"
  };

  const notiNotVisible = {
    opacity: 0,
    pointerEvents: "none"
  };

  const toggleHover = () => {
    setHover(!hover);
  };

  const setNotiHandler = () => {
    console.log(tvData);
    setTvData
    console.log(tvData);
  }
  const setRemindHandler = () => {

  }

  useEffect(() => {

  }, []);

  return (
    <div onMouseLeave={toggleHover} onMouseEnter={toggleHover} className={classes.programItem}>
      <div className={classes.time}>{startTime}
        <div className={classes.noti} style={hover ? notiVisible : notiNotVisible}>
          <BsEnvelope onClick={setNotiHandler} className={classes.envelope} title="Kérek értesítőt" />
          <BsClock onClick={setRemindHandler} className={classes.clock} title="Emlékeztető beállítása" />
        </div>
      </div>
      <a href={filmUrl} className={classes.title}>{title}</a>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default SingeChannelProgramItem;
