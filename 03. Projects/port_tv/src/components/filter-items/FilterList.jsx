import Modal from "../../UI/Modal";

import classes from "./FilterList.module.css";

const FilterList = ({ tvEventInit }) => {
  return (
    <>
      <Modal tvEventInit={tvEventInit} />
      <div className={classes.filterWrapper}></div>
    </>
  );
};

export default FilterList;
