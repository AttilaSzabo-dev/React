import Border from "../UI/Border";

import "./OptionsBox.scss";

const OptionsBox = (props) => {
  return <Border className="option-box--container">{props.option}</Border>;
};

export default OptionsBox;
