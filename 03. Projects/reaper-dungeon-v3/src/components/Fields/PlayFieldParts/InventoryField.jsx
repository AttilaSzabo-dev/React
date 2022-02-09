import Field from "../../UI/Partials/Field";
import SkillBox from "./InventoryElements/SkillBox";
import GearBox from "./InventoryElements/GearBox";

import "./InventoryField.scss";

const OFFENSE_DATA = [
  {
    id: "o1",
    pic_name: "red_1"
  },
  {
    id: "o2",
    pic_name: "red_2"
  },
  {
    id: "o3",
    pic_name: "red_3"
  },
  {
    id: "o4",
    pic_name: "red_4"
  },
  {
    id: "o5",
    pic_name: "red_5"
  },
  {
    id: "o6",
    pic_name: "red_6"
  },
];

const DEFENSE_DATA = [
  {
    id: "d1",
    pic_name: "green_1"
  },
  {
    id: "d2",
    pic_name: "green_2"
  },
  {
    id: "d3",
    pic_name: "green_3"
  },
  {
    id: "d4",
    pic_name: "green_4"
  },
  {
    id: "d5",
    pic_name: "green_5"
  },
  {
    id: "d6",
    pic_name: "green_6"
  },
];

const MAGIC_DATA = [
  {
    id: "m1",
    pic_name: "purple_1"
  },
  {
    id: "m2",
    pic_name: "purple_2"
  },
  {
    id: "m3",
    pic_name: "purple_3"
  },
  {
    id: "m4",
    pic_name: "purple_4"
  },
  {
    id: "m5",
    pic_name: "purple_5"
  },
  {
    id: "m6",
    pic_name: "purple_6"
  },
];

const IventoryField = () => {
  return (
    <Field className="inventory-field">
        <SkillBox boxData={OFFENSE_DATA} />
        <SkillBox boxData={DEFENSE_DATA} />
        <SkillBox boxData={MAGIC_DATA} />
        <GearBox />
    </Field>
  );
};

export default IventoryField;
