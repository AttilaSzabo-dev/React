import { Link } from "react-router-dom";

import ProgramItem from "./ProgramItem";

import classes from "./AllChannelItem.module.css";

const AllChannelItem = ({ logo, programs, key }) => {
  return (
    <div className={classes.tvItem}>
      <div className={classes.logoWrapper}>
        <Link to={`/tv/${key}`}>
          <img src={logo} alt="logo" />
        </Link>
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

export default AllChannelItem;
