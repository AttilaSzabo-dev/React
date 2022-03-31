import { Link } from "react-router-dom";

import classes from "./AllChannelItem.module.css";

const AllChannelItem = ({ logo }) => {
  return (
    <div className={classes.tvItem}>
      <div className={classes.logoWrapper}>
        <Link to="/tv/test">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={classes.channelProgramWrapper}></div>
    </div>
  );
};

export default AllChannelItem;
