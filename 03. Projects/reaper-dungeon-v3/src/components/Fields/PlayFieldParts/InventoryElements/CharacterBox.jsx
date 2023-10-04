import classes from "./CharacterBox.module.scss";

const CharacterBox = (props) => {
  return (
    <div className={classes.section}>
      {/* <div className={classes["exp-wrapper"]}></div> */}
      <div className={classes["char-stats-wrapper"]}></div>
      <div className={classes["health-globe-wrapper"]}>
        <div className={classes["health-globe"]}></div>
      </div>
      <div className={classes["mana-globe-wrapper"]}>
        <div className={classes["mana-globe"]}></div>
      </div>
    </div>
  );
};

export default CharacterBox;
