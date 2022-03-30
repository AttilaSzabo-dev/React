import classes from "./TvItem.module.css";

const TvItem = ({ logo, name }) => {
  return (
    <div className={classes.tvItem}>
      <img src={logo} alt="logo" />
      <p>{name}</p>
    </div>
  );
};

export default TvItem;
