import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TvDataContext from "../../context/TvDataContext";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

import classes from "./AllChannelLogo.module.css";

const AllChannelLogo = ({ channel, id }) => {
  const [addToFavorites, setAddToFavorites] = useState(false);
  const { tvData, setTvData, csrf } = useContext(TvDataContext);

  // TODO tvData favorite törlését megoldani
  const onAddFavoritesHandler = () => {
    if (!addToFavorites) {
      let newFavorite = "i_channels=";
      tvData["favorite"].map((favId) => (newFavorite += favId + "%2C"));
      newFavorite += id;
      setTvData((prevData) => ({
        ...prevData,
        favorite: [...prevData.favorite, id],
      }));

      const xhttp = new XMLHttpRequest();
      xhttp.open(
        "POST",
        "/felhasznalo/portam/set-user-favorite-tv-channels",
        true
      );
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhttp.setRequestHeader("X-CSRF-Token", csrf);
      xhttp.send(newFavorite);
    } else {
      const filteredFavorite = tvData["favorite"].filter(
        (removeId) => removeId !== id
      );
      let newFavorite = "i_channels=";
      filteredFavorite.map((favId) => (newFavorite += favId + "%2C"));

      const xhttp = new XMLHttpRequest();
      xhttp.open(
        "POST",
        "/felhasznalo/portam/set-user-favorite-tv-channels",
        true
      );
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhttp.setRequestHeader("X-CSRF-Token", csrf);
      xhttp.send(newFavorite);
    }
    setAddToFavorites(!addToFavorites);
  };

  let date = "?date=2022-07-20";
  let channelName = channel.name.replace(" ", "-").toLowerCase();
  let channelId = channel.id + date;

  useEffect(() => {
    setAddToFavorites(tvData["favorite"].includes(id));
  }, [tvData, id]);

  return (
    <>
      <div className={classes.logoWrapper}>
        <div onClick={onAddFavoritesHandler} className={classes.likeButton}>
          {addToFavorites && <AiFillHeart className={classes.buttonActive} />}
          {!addToFavorites && (
            <AiOutlineHeart className={classes.buttonInactive} />
          )}
        </div>
        <Link className={classes.imgWrapper} to={`/csatorna/tv/${channelName}/${channelId}`}>
          <img src={channel.logo} alt="logo" />
        </Link>
      </div>
    </>
  );
};

export default AllChannelLogo;
