import Modal from "../../UI/Modal";

import { RiHeartAddFill } from "react-icons/ri";

import classes from "./FilterList.module.css";
import { useState } from "react";

const FilterList = ({ tvEventInit }) => {
  const [modal, setModal] = useState(false);

  const onModalOpen = () => {
    setModal(!modal);
  };

  return (
    <>
      <Modal tvEventInit={tvEventInit} show={modal} onConfirm={onModalOpen} />
      <div className={classes.filterWrapper}>
        <div className={classes.filterContainers}>
          <button className={classes.modalButton} onClick={onModalOpen}>
            <RiHeartAddFill />
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterList;
