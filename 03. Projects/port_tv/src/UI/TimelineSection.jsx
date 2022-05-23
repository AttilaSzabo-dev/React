import classes from "./TimelineSection.module.css";

const TimelineSection = ({time}) => {
    let minuteFix = time.minute === "0" ? "00" : "30";
    return <div className={classes.sections}>{`${time.hour}:${minuteFix}`}</div>
};

export default TimelineSection;