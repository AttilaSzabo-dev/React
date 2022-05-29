import ProgramsWrapper from "./ProgramsWrapper";
import ProgramItem from "./ProgramItem";

/* import classes from "./AllChannelPrograms.module.css"; */

const AllChannelPrograms = (props) => {
  return props.programs.channels.map((channel, index) => (
    <ProgramsWrapper timelineTimes={props.timelineTimes} index={index}>
      {channel.programs.map((item) => (
        <ProgramItem
          actualTime={props.time}
          startTime={item.start_time}
          endTime={item.end_time}
          title={item.title}
          filmUrl={item.film_url}
          start_ts={item.start_ts}
          end_datetime={item.end_datetime}
        />
      ))}
    </ProgramsWrapper>
  ));
};

export default AllChannelPrograms;
