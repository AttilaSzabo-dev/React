import classes from "./Marker.module.css";

const Marker = ({time, timelineTimes}) => {
    const width = {width: (Math.floor(new Date(time.date).getTime()) - timelineTimes.startTimestamp) / 12000 + "px"};
    return <div className={classes.marker} style={width}></div>
};

export default Marker;