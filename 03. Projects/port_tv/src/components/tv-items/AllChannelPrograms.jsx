import ProgramItem from "./ProgramItem";

import classes from "./AllChannelPrograms.module.css";

const AllChannelPrograms = (props) => {
  return props.programs.channels.map((channel) => (
    <div className={classes.programsWrapper}>
      {channel.programs.map((item) => (
        <ProgramItem
          startTime={item.start_time}
          endTime={item.end_time}
          title={item.title}
          filmUrl={item.film_url}
        />
      ))}
    </div>
  ));
};

export default AllChannelPrograms;
