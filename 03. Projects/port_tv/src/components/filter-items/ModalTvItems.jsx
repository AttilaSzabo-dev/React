import { useContext } from "react";

import TvDataContext from "../../context/TvDataContext";

import { AiOutlineHeart } from "react-icons/ai";

import classes from "./ModalTvItems.module.css";

const ModalTvItems = ({ id, name }) => {
  const { tvData, setTvData, csrf } = useContext(TvDataContext);

  const onAddFavorite = () => {
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
  };

  return (
    <div
      className={`${classes.modalTvItemWrapper} ${
        tvData["favorite"].includes(id) ? classes.hide : ""
      }`}
    >
      <AiOutlineHeart onClick={onAddFavorite} className={classes.like} />
      <span className={classes.tvItemName}>{name}</span>
    </div>
  );
};

export default ModalTvItems;
