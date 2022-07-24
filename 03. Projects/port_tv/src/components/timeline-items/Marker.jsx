import classes from "./Marker.module.css";

const Marker = ({time, timelineTimes}) => {
    //const width = {left: ((Math.floor(new Date(time.date).getTime()) - timelineTimes.startTimestamp) / 12000) + 35 + "px"};
    return <div className={classes.marker} /* style={width} */></div>
};

export default Marker;