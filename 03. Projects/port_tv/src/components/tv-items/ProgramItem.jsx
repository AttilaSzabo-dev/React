import classes from "./ProgramItem.module.css";

const ProgramItem = ({
  startTime,
  endTime,
  title,
  filmUrl,
  start_ts,
  end_datetime,
}) => {

  const widthCalc = (Math.floor(new Date(end_datetime).getTime() / 1000) - start_ts) / 12 + "px";

  const width = {
    minWidth: widthCalc,
    maxWidth: widthCalc,
  };

  return (
    <div className={classes.programItem} style={width}>
      <div className={classes.time}>{`${startTime} - ${endTime}`}</div>
      <a href={filmUrl} className={classes.title}>
        {title}
      </a>
    </div>
  );
};

export default ProgramItem;
