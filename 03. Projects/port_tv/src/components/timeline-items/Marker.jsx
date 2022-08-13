import classes from "./Marker.module.css";

const Marker = ({ time }) => {
  const width = { left: time };
  return <div id="timedMarker" className={classes.marker} style={width}></div>;
};

export default Marker;
