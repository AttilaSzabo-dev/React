import { useEffect } from "react";
import SingeChannelProgramItem from "./SingeChannelProgramItem";

import classes from "./SingleChannelItem.module.css";

const SingleChannelItem = ({day, programs}) => {
  
  const date = new Date(day * 1000);
  const day_text = date.toLocaleString("hu-HU", {weekday: "long"});
  const day_num = date.toLocaleString("hu-HU", {day: "numeric"});
  const month = date.toLocaleString("hu-HU", {month: "long"});

  useEffect(() => {
    //console.log("date: ", date);
    console.log("day: ", day);
    console.log("programs: ", programs.channels[0].programs);
  }, [day, programs]);


  return (
    <div className={classes.tvSingleItemWrapper}>
      <div className={classes.headWrapper}>
        <span className={classes.day}>{day_text}</span>
        <span className={classes.month}>{month} {day_num}</span>
      </div>
      <div className={classes.channelProgramWrapper}>
        {programs.channels[0].programs.map((item) => (
          <SingeChannelProgramItem
            key={item.id}
            notificId={item.id}
            reminderId={item.film_id}
            startTime={item.start_time}
            startTs={item.start_ts}
            title={item.title}
            filmUrl={item.film_url}
            description={item.short_description}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleChannelItem;
