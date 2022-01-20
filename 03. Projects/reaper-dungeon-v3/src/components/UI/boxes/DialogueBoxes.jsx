import classes from "./DialogueBoxes.module.scss";

const DialogueBoxes = (props) => {
  return (
    <div className={`${props.className} ${classes.box}`}>{props.children}</div>
  );
};

export default DialogueBoxes;
