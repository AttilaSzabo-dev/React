import Field from "../../UI/Partials/Field";
import BackpackBox from "./BackpackElements/BackpackBox";

import "./BackpackField.scss";

const BackpackField = () => {
  return (
    <Field className="backpack-field">
      <BackpackBox />
    </Field>
  );
};

export default BackpackField;
