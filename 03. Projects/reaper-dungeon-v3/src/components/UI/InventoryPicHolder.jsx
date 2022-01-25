import heart from "../../images/stat/health/heart.png";

import classes from "./InventoryPicHolder.module.scss";

const InventoryPicHolder = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <img src={heart} alt="" />
    </div>
  );
};

export default InventoryPicHolder;
