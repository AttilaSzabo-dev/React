import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

import classes from "./AllChannelLogo.module.css";

const AllChannelLogo = ({ channel, parentIndex, index, id, favorite }) => {
  const [addToFavorites, setAddToFavorites] = useState(false);

  // TODO kideríteni hogy honnan jön a X-CSRF-Token
  const onAddFavoritesHandler = () => {
    if (!addToFavorites) {
      favorite.push(id);
      let newFavorite = "i_channels=";
      favorite.map((favId) => newFavorite += favId + ("%2C"));
      newFavorite += id;
      //let form_data = new FormData();
      //form_data.append( "i_channels", newFavorite );

      fetch("/felhasznalo/portam/set-user-favorite-tv-channels", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          //'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: newFavorite
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log("hozzáad post error: ", error.message);
      });
    }else {
      const newFavorite = favorite.filter(removeId => removeId !== id);
      fetch("felhasznalo/portam/set-user-favorite-tv-channels", {
        method: 'POST',
        body: JSON.stringify({i_channels: newFavorite})
      }).catch((error) => {
        console.log("elvesz post error: ", error.message);
      });
    }
    setAddToFavorites(!addToFavorites);
  };

  useEffect(() => {
    setAddToFavorites(favorite.includes(id));
  }, [favorite, id]);

  return (
    <>
      {parentIndex === 0 && index === 3 ? <div className={classes.spacerDivTop}></div> : ""}
      {parentIndex === 0 && index === 17 ? <div className={classes.spacerDivBottom}></div> : ""}
      <div className={classes.logoWrapper}>
        <div onClick={onAddFavoritesHandler} className={classes.likeButton}>
          {addToFavorites && <AiFillHeart className={classes.buttonActive} />}
          {!addToFavorites && (<AiOutlineHeart className={classes.buttonInactive} />)}
        </div>
        <Link className={classes.imgWrapper} to={`/tv${channel.id}`}>
          <img src={channel.logo} alt="logo" />
        </Link>
      </div>
    </>
  );
};

export default AllChannelLogo;
