import { AiOutlineHeart } from "react-icons/ai";

import classes from "./ModalTvItems.module.css";

const ModalTvItems = ({ id, name }) => {
  return (
    <div className={classes.modalTvItemWrapper}>
      <AiOutlineHeart className={classes.like} />
      <span className={classes.tvItemName}>{name}</span>
    </div>
  );
};

export default ModalTvItems;
