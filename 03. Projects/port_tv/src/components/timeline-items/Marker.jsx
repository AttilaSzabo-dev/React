import { useContext } from "react";
import TvInitContext from "../../context/TvInitContext";

import classes from "./Marker.module.css";

const Marker = ({timelineTimes}) => {
    const tvInitCtx = useContext(TvInitContext);
    const width = {left: (Math.floor(new Date(tvInitCtx.date).getTime()) - timelineTimes.startTimestamp) / 12000 + "px"};
    return <div className={classes.marker} style={width}></div>
};

export default Marker;