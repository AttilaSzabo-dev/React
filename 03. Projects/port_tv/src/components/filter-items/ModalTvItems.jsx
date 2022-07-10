import { useContext } from "react";

import TvContext from "../../context/TvContext";

import { AiOutlineHeart } from "react-icons/ai";

import classes from "./ModalTvItems.module.css";

const ModalTvItems = ({ id, name }) => {
  const tvCtx = useContext(TvContext);

  const onAddFavorite = () => {
    console.log("onAddFavorite");
    let newFavorite = "i_channels=";
    let newFavoriteArray = tvCtx.tvData.favorite;
    tvCtx.tvData["favorite"].map((favId) => (newFavorite += favId + "%2C"));
    newFavorite += id;
    newFavoriteArray.push(id);
    tvCtx.setFavorites(newFavoriteArray);

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
    xhttp.setRequestHeader("X-CSRF-Token", tvCtx.csrf);
    xhttp.send(newFavorite);
  };

  return (
    <div
      className={`${classes.modalTvItemWrapper} ${
        tvCtx.tvData["favorite"].includes(id) ? classes.hide : ""
      }`}
    >
      <AiOutlineHeart onClick={onAddFavorite} className={classes.like} />
      <span className={classes.tvItemName}>{name}</span>
    </div>
  );
};

export default ModalTvItems;
