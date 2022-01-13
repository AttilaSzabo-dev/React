import StoryBox from "../../DialogueBoxes/StoryBox";
import OptionsBox from "../../DialogueBoxes/OptionsBox";
import Border from "../../UI/Border";

import "./DialogueField.scss";

const DialogueField = () => {
  const story = "story";
  const option_1 = "option_1";
  const option_2 = "option_2";
  const option_3 = "option_3";

  return (
    <div className="dialogue-field">
      <Border className="dialogue-field--container">
        <StoryBox story={story} />
        <div className="dialogue-field--option-container">
          <OptionsBox option={option_1} />
          <OptionsBox option={option_2} />
          <OptionsBox option={option_3} />
        </div>
      </Border>
    </div>
  );
};

export default DialogueField;
