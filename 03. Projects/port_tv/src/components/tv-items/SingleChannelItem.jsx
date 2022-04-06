import ProgramItem from "./ProgramItem";

import classes from "./SingleChannelItem.module.css";

const SingleChannelItem = ({formattedDate, today, programs}) => {
  return (
    <div className={classes.tvSingleItem}>
      <div className={classes.headWrapper}>
          <p>{formattedDate}</p>
      </div>
      <div className={classes.channelProgramWrapper}>
        {programs.map((item) => (
          <ProgramItem
            startTime={item.start_time}
            endTime={item.end_time}
            title={item.title}
            filmUrl={item.film_url}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleChannelItem;
