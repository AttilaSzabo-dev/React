import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TvContext from "../../context/TvContext";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

import classes from "./AllChannelLogo.module.css";

const AllChannelLogo = ({ channel, parentIndex, index, id, favorite }) => {
  const tvCtx = useContext(TvContext);
  const [addToFavorites, setAddToFavorites] = useState(false);

  // TODO tvData favorite törlését megoldani
  const onAddFavoritesHandler = () => {

    if (!addToFavorites) {
      let newFavorite = "i_channels=";
      let newFavoriteArray = tvCtx.tvData.favorite;
      tvCtx.tvData["favorite"].map((favId) => newFavorite += favId + ("%2C"));
      newFavorite += id;
      newFavoriteArray.push(id);
      tvCtx.setFavorites(newFavoriteArray);
      //setTvData(prevData => ({...prevData, favorite: [...prevData.favorite, id]}));
      
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/felhasznalo/portam/set-user-favorite-tv-channels", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
      xhttp.setRequestHeader("X-CSRF-Token", tvCtx.csrf);
      xhttp.send(newFavorite);
    }else {
      console.log("remove");
      const filteredFavorite = tvCtx.tvData["favorite"].filter(removeId => removeId !== id);
      let newFavorite = "i_channels=";
      filteredFavorite.map((favId) => newFavorite += favId + ("%2C"));

      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/felhasznalo/portam/set-user-favorite-tv-channels", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
      xhttp.setRequestHeader("X-CSRF-Token", tvCtx.csrf);
      xhttp.send(newFavorite);
    }
    setAddToFavorites(!addToFavorites);
  };

  useEffect(() => {
    setAddToFavorites(tvCtx.tvData["favorite"].includes(id));
  }, [tvCtx.tvData, id]);

  return (
    <>
      {parentIndex === 0 && index === 3 ? <div className={classes.spacerDivTop}></div> : ""}
      {parentIndex === 0 && index === 17 ? <div className={classes.spacerDivBottom}></div> : ""}
      <div className={classes.logoWrapper}>
        <div onClick={onAddFavoritesHandler} className={classes.likeButton}>
          {addToFavorites && <AiFillHeart className={classes.buttonActive} />}
          {!addToFavorites && (<AiOutlineHeart className={classes.buttonInactive} />)}
        </div>
        <Link className={classes.imgWrapper} to={`/tv&${channel.id}`}>
          <img src={channel.logo} alt="logo" />
        </Link>
      </div>
    </>
  );
};

export default AllChannelLogo;
