import classes from "./GearBoxItem.module.scss";

const GearBoxItem = ({ image }) => {
  return (
    <div className={classes.gearContainer}>
      <img
        className={classes.gearImageWrapper}
        src={require(`../../../../../../images/gear/${image}.png`)}
        alt=""
      />
    </div>
  );
};

export default GearBoxItem;
