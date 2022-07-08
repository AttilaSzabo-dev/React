import Modal from "../../UI/Modal";

import { RiHeartAddFill } from "react-icons/ri";

import classes from "./FilterList.module.css";
import { useContext, useState } from "react";
import TvDataContext from "../../context/TvDataContext";

const FilterList = () => {
  const { tvData, setTvData, csrf } = useContext(TvDataContext);
  const [modal, setModal] = useState(false);

  const onModalOpen = () => {
    setModal(!modal);
  };

  return (
    <>
      <Modal show={modal} onConfirm={onModalOpen} />
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
