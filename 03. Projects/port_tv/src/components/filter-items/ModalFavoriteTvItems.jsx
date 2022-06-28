import { MdDragIndicator } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

import classes from "./ModalFavoriteTvItems.module.css";

const ModalFavoriteTvItems = ({ id }) => {
  return (
    <div className={classes.modalFavoriteTvItemWrapper}>
      <div className={classes.wrapper}>
        <MdDragIndicator className={classes.drag} />
        <AiFillHeart className={classes.like} />
        <span className={classes.tvItemName}>{id}</span>
      </div>
      <div className={classes.wrapper}>
        <MdKeyboardArrowUp className={`${classes.up} ${classes.arrows}`} />
        <MdKeyboardArrowDown className={`${classes.down} ${classes.arrows}`} />
      </div>
    </div>
  );
};

export default ModalFavoriteTvItems;
