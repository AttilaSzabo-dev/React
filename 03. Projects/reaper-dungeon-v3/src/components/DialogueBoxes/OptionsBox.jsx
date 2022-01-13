import Border from "../UI/Border";
import "./OptionsBox.scss";

const OptionsBox = (props) => {
  return (
    <div>
      <Border className="option-box--container">{props.option}</Border>
    </div>
  );
};

export default OptionsBox;
