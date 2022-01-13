import Border from "../UI/Border";

import "./StoryBox.scss";

const StoryBox = (props) => {
  return <Border className="story-box--container">{props.story}</Border>;
};

export default StoryBox;
