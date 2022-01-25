import Field from "../../UI/Partials/Field";
import StoryBox from "./DialogueElements/StoryBox";
import OptionsBox from "./DialogueElements/OptionsBox";

import "./DialogueField.scss";

const DialogueField = () => {
  const story = "story";
  const option_1 = "option_1";
  const option_2 = "option_2";
  const option_3 = "option_3";

  return (
    <Field className="dialogue-field">
        <StoryBox story={story} />
        <div className="dialogue-field--option-container">
          <OptionsBox option={option_1} />
          <OptionsBox option={option_2} />
          <OptionsBox option={option_3} />
        </div>
    </Field>
  );
};

export default DialogueField;
