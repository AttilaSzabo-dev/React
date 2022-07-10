import { useContext, useEffect, useState } from "react";

import TvContext from "../../context/TvContext";

import { BsEnvelope } from "react-icons/bs";
import { BsClock } from "react-icons/bs";

import classes from "./ProgramItem.module.css";

const ProgramItem = ({
  notificId,
  reminderId,
  startTime,
  endTime,
  title,
  filmUrl,
  start_ts,
  end_datetime,
}) => {
  const tvCtx = useContext(TvContext);
  const [notiStatus, setNotiStatus] = useState(false);
  const [remindStatus, setRemindStatus] = useState(false);
  const [hover, setHover] = useState(false);

  const background =
    start_ts > Math.floor(new Date(tvCtx.date).getTime() / 1000)
      ? "#fff"
      : "#f3f3f3";
  const widthCalc =
    (Math.floor(new Date(end_datetime).getTime() / 1000) - start_ts) / 12 +
    "px";

  const addCss = {
    minWidth: widthCalc,
    maxWidth: widthCalc,
    backgroundColor: background,
  };

  const visible = {
    opacity: 1,
    pointerEvents: "all",
  };

  const notVisible = {
    opacity: 0,
    pointerEvents: "none",
  };

  const toggleHover = () => {
    setHover(!hover);
  };

  const setNotiHandler = () => {
    if (notiStatus) {
      const copy = tvCtx.tvData.notifications;
      delete copy[notificId];
      tvCtx.setNotifications(copy);
      /* setTvData((currentData) => {
        const copy = { ...currentData };
        delete copy["notifications"][notificId];
        return copy;
      }); */
    } else {
      tvCtx.setNotifications({[notificId]: 1});
      /* setTvData((prevData) => ({
        ...prevData,
        notifications: { ...prevData.notifications, [notificId]: 1 },
      })); */
    }
    setNotiStatus(!notiStatus);
    sendData(true);
  };
  const setRemindHandler = () => {
    if (remindStatus) {
      const copy = tvCtx.tvData.reminders;
      delete copy[reminderId];
      tvCtx.setReminders(copy);
      /* setTvData((currentData) => {
        const copy = { ...currentData };
        delete copy["reminders"][reminderId];
        return copy;
      }); */
    } else {
      tvCtx.setReminders({[reminderId]: 1});
      /* setTvData((prevData) => ({
        ...prevData,
        reminders: { ...prevData.reminders, [reminderId]: 1 },
      })); */
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
    xhttp.setRequestHeader("X-CSRF-Token", tvCtx.csrf);
    xhttp.send(entity);
  };

  useEffect(() => {
    for (const key in tvCtx.tvData.notifications) {
      if (key === notificId) {
        setNotiStatus(true);
      }
    }

    for (const key in tvCtx.tvData.reminders) {
      if (key === reminderId) {
        setRemindStatus(true);
      }
    }
  }, [tvCtx.tvData.notifications, tvCtx.tvData.reminders, notificId, reminderId]);

  return (
    <div
      onMouseLeave={toggleHover}
      onMouseEnter={toggleHover}
      className={classes.programItem}
      style={addCss}
    >
      <div className={classes.time}>
        {`${startTime} - ${endTime}`}
        <div className={classes.noti}>
          <BsEnvelope
            onClick={setNotiHandler}
            className={`${classes.envelope} ${
              notiStatus ? classes.active : ""
            }`}
            style={hover ? visible : notVisible}
            title="Kérek értesítőt"
          />
          <BsClock
            onClick={setRemindHandler}
            className={`${classes.clock} ${remindStatus ? classes.active : ""}`}
            style={hover ? visible : notVisible}
            title="Emlékeztető beállítása"
          />
        </div>
      </div>
      <a href={filmUrl} className={classes.title}>
        {title}
      </a>
    </div>
  );
};

export default ProgramItem;
