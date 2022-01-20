import DialogueBoxes from "../../../UI/boxes/DialogueBoxes";
import "./OptionsBox.scss";

const OptionsBox = (props) => {
  return (
    <DialogueBoxes className="option-box--container">
      {props.option}
    </DialogueBoxes>
  );
};

export default OptionsBox;
