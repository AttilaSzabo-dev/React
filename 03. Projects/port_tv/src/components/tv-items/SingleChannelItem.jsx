import ProgramItem from "./ProgramItem";

import classes from "./SingleChannelItem.module.css";

const SingleChannelItem = ({day}) => {
  console.log("day: ", day);
  const date = new Date(day);
  const day_text = date.toLocaleString("hu-HU", {day: "numeric"});
  const day_num = date.toLocaleString("hu-HU", {day: "numeric"});
  const month = date.toLocaleString("hu-HU", {month: "numeric"});


  return (
    <div className={classes.tvSingleItem}>
      <div className={classes.headWrapper}>
          <p>{day_text}</p>
          <p>{day_num}</p>
          <p>{month}</p>
      </div>
      {/* <div className={classes.channelProgramWrapper}>
        {programs.map((item) => (
          <ProgramItem
            startTime={item.start_time}
            endTime={item.end_time}
            title={item.title}
            filmUrl={item.film_url}
          />
        ))}
      </div> */}
    </div>
  );
};

export default SingleChannelItem;
