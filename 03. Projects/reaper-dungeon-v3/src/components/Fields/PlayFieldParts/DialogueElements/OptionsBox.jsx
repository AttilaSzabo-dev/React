import DialogueBoxes from "../../../UI/Partials/DialogueBoxes";
import "./OptionsBox.scss";

const OptionsBox = (props) => {
  return (
    <DialogueBoxes className="option-box--container">
      {props.option}
    </DialogueBoxes>
  );
};

export default OptionsBox;
