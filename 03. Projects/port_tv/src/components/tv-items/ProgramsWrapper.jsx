import classes from "./ProgramsWrapper.module.css";

const ProgramsWrapper = props => {
    const paddingLeft = {paddingLeft: (((props.timelineTimes.firstProgramsStartTime[props.index] * 1000) - props.timelineTimes.startTimestamp) / 12000) + 185 + "px"};
    
    return <div className={classes.programsWrapper} style={paddingLeft}>{props.children}</div>
};

export default ProgramsWrapper;