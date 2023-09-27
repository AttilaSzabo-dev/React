import classes from "./BackpackItem.module.scss";

const BackpackItem = ({ image }) => {
  return (
    <div className={classes.gearContainer}>
      <img
        className={classes.gearImageWrapper}
        src={require(`../../../../images/gear/${image}.png`)}
        alt=""
      />
    </div>
  );
};

export default BackpackItem;
