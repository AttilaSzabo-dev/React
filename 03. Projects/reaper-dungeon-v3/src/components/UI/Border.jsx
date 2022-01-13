import "./Border.scss";

const Border = (props) => {
  const classes = props.className;

    return <div className={classes}>{props.children}</div>
};

export default Border;
