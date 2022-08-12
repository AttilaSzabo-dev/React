import { useState, useContext, useEffect } from "react";
import MarginContext from "../../context/MarginContext";
import classes from "./ProgramsWrapper.module.css";

const ProgramsWrapper = props => {
    const [paddingLeft, setPaddingLeft] = useState({
        paddingLeft: 0
    });
    const { marginLeftValue } = useContext(MarginContext);
    // TODO: props.index nem jó azonosító a forEach miatt
    useEffect(() => {
        /* console.log("programsWrapper props.timelineTimes.firstProgramsStartTime[props.index]: ", props.timelineTimes.firstProgramsStartTime[props.index]);
        console.log("[props.index]: ", [props.index]);
        console.log("programsWrapper props.timelineTimes.startTimestamp: ", props.timelineTimes.startTimestamp); */
        setPaddingLeft({
            paddingLeft: (((props.timelineTimes.firstProgramsStartTime[props.index] * 1000) - props.timelineTimes.startTimestamp) / 12000) + 185 + "px"
        });
    }, [props.timelineTimes]);
    //const paddingLeft = {paddingLeft: (((props.timelineTimes.firstProgramsStartTime[props.index] * 1000) - props.timelineTimes.startTimestamp) / 12000) + 185 + "px", marginLeft: props.marginLeft};
    
    return <div className={classes.programsWrapper} style={{...paddingLeft, ...marginLeftValue}}>{props.children}</div>
};

export default ProgramsWrapper;