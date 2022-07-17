import { useState, useEffect } from "react";
import ModalContext from "../../context/ModalContext";

import Modal from "../../UI/Modal";
import EditFavoriteChannels from "./EditFavoriteChannels";

import { RiHeartAddFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import classes from "./FilterList.module.css";

const FilterList = ({ initData }) => {
  const [modal, setModal] = useState(false);
  const value = { modal, setModal };

  const [days, setDays] = useState([]);
  const [active, setActive] = useState(false);
  const [daysSelector, setDaysSelector] = useState(false);

  const onModalOpen = () => {
    setModal(!modal);
  };

  const dayHandler = (e) => {
    console.log("event", e);
  };

  useEffect(() => {
    initData.days.forEach((day) => {
      const date = new Date(day * 1000);
      const day_text = date.toLocaleString("hu-HU", { weekday: "long" });
      const day_num = date.toLocaleString("hu-HU", { day: "numeric" });
      const month = date.toLocaleString("hu-HU", { month: "long" });

      setDays((prev) => [
        ...prev,
        { day_text: day_text, day_num: day_num, month: month, timestamp: day },
      ]);
    });
  }, [initData.days]);

  console.log("days: ", days);

  return (
    <>
      <ModalContext.Provider value={value}>
        <Modal toShow={`${modal ? "show" : ""}`}>
          <EditFavoriteChannels initData={initData} />
        </Modal>
      </ModalContext.Provider>
      <div className={classes.filterWrapper}>
        <div className={classes.filterContainers}>
        {days.length > 0 && <div className={classes.dateContainer}>
             <button className={`${classes.buttons} ${!active ? classes.active : ""}`} onClick={(e=>(dayHandler(days[2].timestamp)))}>
              <span className={classes.day}>Ma</span>
              <span className={classes.date}>{days[2].month} {days[2].day_num}</span>
            </button>
            <button className={`${classes.buttons} ${active ? classes.active : ""}`} onClick={(e=>(dayHandler(days[3].timestamp)))}>
              <span className={classes.day}>Holnap</span>
              <span className={classes.date}>{days[3].month} {days[3].day_num}</span>
            </button>
            <button className={classes.openDates} onClick={(e)=>(setDaysSelector(!daysSelector))}>
              <MdKeyboardArrowDown className={classes.downIcon} />
            </button>
            <div className={`${classes.daysSelector} ${daysSelector ? classes.open : ""}`}>
            {days.map((day) => 
              <button className={classes.daySelectorButtons}>
                <span className={classes.daySelectorBold}>{`${day.day_text} - `}<span className={classes.daySelectorRegular}>{`${day.month} ${day.day_num}`}</span></span>
              </button>
            )}
            </div>
          </div>}
          <button className={classes.modalButton} onClick={onModalOpen}>
            <RiHeartAddFill className={classes.editFavIcon}/>
          </button>
          <div className={classes.programFilterContainer}>
            <button className={`${classes.programFilterButtons} ${classes.programFilterFilm}`}>Film</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterSeries}`}>Sorozat</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterSport}`}>Sport</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterSportLive}`}>Sport (élő)</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterReality}`}>Reality</button>
            <button className={`${classes.programFilterButtons} ${classes.programFilterGastro}`}>Gasztró</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterList;
