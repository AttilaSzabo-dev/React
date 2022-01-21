import classes from "./DialogueBoxes.module.scss";

const DialogueBoxes = (props) => {
  return (
    <div className={`${classes.box} ${props.className}`}>{props.children}</div>
  );
};

export default DialogueBoxes;
