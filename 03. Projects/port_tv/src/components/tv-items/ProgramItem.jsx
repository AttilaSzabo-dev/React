import classes from "./ProgramItem.module.css";

const ProgramItem = ({startTime, endTime, title, filmUrl}) => {
  return (
    <div className={classes.programItem}>
      <div className={classes.time}>{`${startTime} - ${endTime}`}</div>
      <a href={filmUrl} className={classes.title}>{title}</a>
    </div>
  );
};

export default ProgramItem;
