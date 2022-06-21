import classes from "./SingeChannelProgramItem.module.css";

const SingeChannelProgramItem = ({startTime, title, filmUrl, description}) => {
  return (
    <div className={classes.programItem}>
      <div className={classes.time}>{startTime}</div>
      <a href={filmUrl} className={classes.title}>{title}</a>
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default SingeChannelProgramItem;
