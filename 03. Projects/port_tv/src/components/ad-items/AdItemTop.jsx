import classes from "./AdItemTop.module.css";

const AdItemTop = (props) => {
  return (
    <div className={classes.adItem}>
      <div className={classes.adContent}></div>
    </div>
  );
};

export default AdItemTop;