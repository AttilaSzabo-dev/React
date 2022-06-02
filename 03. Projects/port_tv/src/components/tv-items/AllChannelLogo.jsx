import { Link } from "react-router-dom";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

import classes from "./AllChannelLogo.module.css";
import { useState } from "react";

const AllChannelLogo = (props) => {
  const [addToFavorites, setAddToFavorites] = useState(false);

  const onAddFavoritesHandler = () => {
    setAddToFavorites(!addToFavorites);
  };

  return props.programs.channels.map((channel, index) => (
    <>
      {index === 3 ? <div className={classes.spacerDivTop}></div> : ""}
      {index === 17 ? <div className={classes.spacerDivBottom}></div> : ""}
      <div className={classes.logoWrapper}>
        <div onClick={onAddFavoritesHandler} className={classes.likeButton}>
          {addToFavorites && <AiFillHeart className={classes.buttonColor}/>}
          {!addToFavorites && <AiOutlineHeart className={classes.buttonColor}/>}
        </div>
        <Link to={`/tv${channel.id}`}>
          <img src={channel.logo} alt="logo" />
        </Link>
      </div>
    </>
  ));
};

export default AllChannelLogo;
