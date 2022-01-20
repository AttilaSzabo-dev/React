import DialogueBoxes from "../../../UI/boxes/DialogueBoxes";
import "./StoryBox.scss";

const StoryBox = (props) => {
  return (
    <DialogueBoxes className="story-box--container">
      {props.story}
    </DialogueBoxes>
  );
};

export default StoryBox;
