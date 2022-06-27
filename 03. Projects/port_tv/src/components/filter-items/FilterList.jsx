import Modal from "../../UI/Modal";

import classes from "./FilterList.module.css";

const FilterList = (props) => {
  return (
    <>
      <Modal />
      <div className={classes.filterWrapper}></div>
    </>
  );
};

export default FilterList;
