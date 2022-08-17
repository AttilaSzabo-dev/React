import { useState, useContext, useEffect } from "react";
import MarginContext from "../../context/MarginContext";
import classes from "./ProgramsWrapper.module.css";

const ProgramsWrapper = props => {
    const [paddingLeft, setPaddingLeft] = useState({
        paddingLeft: 0
    });
    const { marginLeftValue } = useContext(MarginContext);
    useEffect(() => {
        setPaddingLeft({
            paddingLeft: (((props.channelStartTs * 1000) - props.timelineTimes.startTimestamp) / 12000) + 185 + "px"
        });
    }, [props.timelineTimes, props.channelStartTs]);
    
    return <div className={classes.programsWrapper} style={{...paddingLeft, ...marginLeftValue}}>{props.children}</div>
};

export default ProgramsWrapper;