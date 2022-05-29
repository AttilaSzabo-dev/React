import classes from "./ProgramItem.module.css";

const ProgramItem = ({
  actualTime,
  startTime,
  endTime,
  title,
  filmUrl,
  start_ts,
  end_datetime,
}) => {
  console.log("actualTime: ", actualTime);
  const background = start_ts > Math.floor(new Date(actualTime.date).getTime() / 1000) ? "#fff" : "#f3f3f3";
  const widthCalc =
    (Math.floor(new Date(end_datetime).getTime() / 1000) - start_ts) / 12 + "px";

  const addCss = {
    minWidth: widthCalc,
    maxWidth: widthCalc,
    backgroundColor: background
  };

  return (
    <div className={classes.programItem} style={addCss}>
      <div className={classes.time}>{`${startTime} - ${endTime}`}</div>
      <a href={filmUrl} className={classes.title}>
        {title}
      </a>
    </div>
  );
};

export default ProgramItem;
