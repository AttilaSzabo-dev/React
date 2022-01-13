import Border from "../UI/Border";

import "./StoryBox.scss";

const StoryBox = (props) => {
  return (
    <div>
      <Border className="story-box--container">{props.story}</Border>
    </div>
  );
};

export default StoryBox;
