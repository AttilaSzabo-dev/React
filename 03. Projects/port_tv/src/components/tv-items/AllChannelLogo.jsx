import { Link } from "react-router-dom";

import classes from "./AllChannelLogo.module.css";

const AllChannelLogo = (props) => {
  return props.programs.channels.map((channel) => (
    <div className={classes.logoWrapper}>
      <Link to={`/tv${channel.id}`}>
        <img src={channel.logo} alt="logo" />
      </Link>
    </div>
  ));
};

export default AllChannelLogo;
