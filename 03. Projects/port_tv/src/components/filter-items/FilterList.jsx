import { useState, useEffect, useContext, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import ModalContext from "../../context/ModalContext";
import FilterContext from "../../context/FilterContext";

import Modal from "../../UI/Modal";
import EditFavoriteChannels from "./EditFavoriteChannels";

import { RiHeartAddFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import { BsSearch } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

import classes from "./FilterList.module.css";
import ChannelFilter from "./ChannelFilter";

const FilterList = ({ initData, introCb = () => {}, introKey = {} }) => {
  const { filterValues, setFilterValues } = useContext(FilterContext);
  const [modal, setModal] = useState(false);
  const value = { modal, setModal };
  const inputRef = useRef(null);

  const [search, setSearch] = useState(null);
  const [searchModal, setSearchModal] = useState(false);
  const [expandSearchField, setExpandSearchField] = useState(false);

  const [categories, setCategories] = useState([]);
  const [days, setDays] = useState([]);
  const [counter, setCounter] = useState(3);
  const [active, setActive] = useState(false);
  const [daysSelectorDropdown, setDaysSelectorDropdown] = useState(false);
  const [programFilter, setProgramFilter] = useState({
    film: false,
    sorozat: false,
    sport: false,
    sportLive: false,
    reality: false,
    gastro: false,
    activeFilters: [],
  });

  const isDesktop = useMediaQuery({ query: "(min-width: 500px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 499px)" });

  //********************************************* */
  const functionSelfName = "FilterList";

  const [introCalled, setIntroCalled] = useState(false);
  useEffect(() => {
    if (
      !introCalled &&
      typeof functionSelfName == "string" &&
      typeof introCb === "function" &&
      typeof introKey[functionSelfName] === "string"
    ) {
      setIntroCalled(true);
      introCb(introKey[functionSelfName]);
    }
  });

  const isSingleChannel = () => window.location.pathname.match('/csatorna\/tv/') !== null;

  const gemiusHit = (checkGemiusId, extra) => {
    if (
      typeof window.pp_gemius_hit === "function" &&
      typeof window.gemius_identifier === "string" &&
      typeof window.port_gemius_identifiers === "object"
    ) {
      //nyito gemius kod
      let sectionType = isSingleChannel() ? 'tv-csatorna' : 'tv-nyito';
      let code = window.port_gemius_identifiers[sectionType];
      if (checkGemiusId) {
        if (window.gemius_identifier !== code) {
          console.log('pp_gemius_hit', sectionType, code, extra);
          if (extra !== undefined) {
            window.pp_gemius_hit(code, `portevent=${extra}`);
          } else {
            window.pp_gemius_hit(code);
          }
          window.gemius_identifier = "";
        }
      } else {
        console.log('pp_gemius_hit', sectionType, code, extra);
        if (extra !== undefined) {
          window.pp_gemius_hit(code, `portevent=${extra}`);
        } else {
          window.pp_gemius_hit(code);
        }
      }
    }
  }

  //********************************************* */

  const onModalOpen = () => {
    setModal(!modal);
  };

  const counterHandler = (e) => {
    if (e === 2) {
      setActive(false);
      setFilterValues((prev) => ({
        ...prev,
        dateFilter: days[e].timestamp,
      }));
      setCounter(e + 1);
    } else {
      setActive(true);
      setCounter(e);
      setFilterValues((prev) => ({
        ...prev,
        dateFilter: days[e].timestamp,
      }));
    }
    setDaysSelectorDropdown(false);
    gemiusHit(false, 'filter-date');
  };

  const programFilterHandler = (e) => {
    if (!programFilter.activeFilters.includes(e)) {
      setProgramFilter((prev) => ({
        ...prev,
        activeFilters: [...prev.activeFilters, e],
        [e]: true,
      }));
    } else {
      const filtered = programFilter.activeFilters.filter(
        (toremove) => toremove !== e
      );
      setProgramFilter((prev) => ({
        ...prev,
        activeFilters: filtered,
        [e]: false,
      }));
    }
    if (isMobile) {
      gemiusHit(false, 'filter-program');
    }
  };

  const onSelectChange = (e) => {
    setFilterValues((prev) => ({
      ...prev,
      channelFilter: e.target.value,
    }));
    gemiusHit(false, 'filter-channel');
  };

  useEffect(() => {
    setFilterValues((prev) => ({
      ...prev,
      programFilter: programFilter.activeFilters,
    }));
  }, [programFilter.activeFilters]);

  useEffect(() => {
    let today = initData.date.split("T")[0];
    const date = new Date(today);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    initData.days.forEach((day) => {
      const date = new Date(day * 1000);
      const day_text = date.toLocaleString("hu-HU", { weekday: "long" });
      let dayFinal = day_text.charAt(0).toUpperCase() + day_text.slice(1);
      const day_num = date.toLocaleString("hu-HU", { day: "numeric" });
      const month = date.toLocaleString("hu-HU", { month: "long" });

      let tegnap = unixTimestamp - 86400;
      let ma = unixTimestamp;
      let holnap = unixTimestamp + 86400;
      let dayName;

      if (tegnap === day) {
        dayName = "Tegnap";
      } else if (ma === day) {
        dayName = "Ma";
      } else if (holnap === day) {
        dayName = "Holnap";
      } else {
        dayName = dayFinal;
      }

      setDays((prev) => [
        ...prev,
        {
          day_text: dayName,
          day_num: day_num,
          month: month,
          daysDateText: initData.daysDate,
          timestamp: day,
          today: unixTimestamp,
        },
      ]);
    });
  }, [initData.days]);

  useEffect(() => {
    let groups = Object.values(initData.channelGroups);
    setCategories(groups);
  }, [initData]);

  const createSearchGroups = (data) => {
    let groupArray = [];
    let keywordArray = [];

    data.forEach((item)=>{
      const filterDate = new Date(item.timestamp * 1000);
      const year = filterDate.getFullYear();
      const month = filterDate.toLocaleString("hu-HU", { month: "2-digit" });
      const day = filterDate.toLocaleString("hu-HU", { day: "2-digit" });
      const finalDate = `${year}-${month}-${day}`;
      item.newUrl = `${item.channelURl}?date=${finalDate}`;

      if (!keywordArray.includes(item.day)) {
        keywordArray.push(item.day)
        groupArray.push(data.filter(filterItem => filterItem.day === item.day ))
      }
    });
    setSearchModal(true);
    setSearch(groupArray);
    setExpandSearchField(false);
    console.log("groupArray: ", groupArray);
  }

  useEffect(() => {
    if (searchModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [searchModal]);

  useEffect(() => {
    if (inputRef !== null) {
      inputRef.current.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          let searchValue = inputRef.current.value;
          fetch(`${window.location.protocol}//${window.location.host}/tvapi/search?q=${searchValue}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log("search data: ", data);
              createSearchGroups(data);
              /* setIsLoading(false); */
            })
            .catch((error) => {
              //setError(error.message);
            });
        }
      });
    }
  }, [inputRef]);

  console.log("search: ", search);

  return (
    <>
      <ModalContext.Provider value={value}>
        <Modal toShow={`${modal ? "show" : ""}`}>
          <EditFavoriteChannels initData={initData} />
        </Modal>
      </ModalContext.Provider>
      <div
        className={`${classes.searchModalOverlay} ${
          searchModal ? "" : classes.modalHide
        }`}
        onClick={(e) => {
          setSearchModal(false);
        }}
      ></div>
      <div
        className={`${classes.searchModal} ${
          searchModal ? "" : classes.modalHide
        }`}
      >
        <div className={classes.header}>
          <span>Keresés</span>
          <div
            className={classes.searchModalClose}
            onClick={(e) => {
              setSearchModal(false);
            }}
          >
            X
          </div>
        </div>
        {search !== null && search.length === 0 && <span>Jelenleg a keresési feltételnek megfelelő műsor nincs adatbázisunkban.</span> }
        {search !== null &&
          search.map((group) => (
            <>
              <div className={classes.groupHeader}>
                <span>{group[0].day}</span>
              </div>
              {group.map((item) => (
                <div className={classes.groupItemContainer}>
                  <div className={classes.imageWrapper}>
                    {item.img.length === 0 ? (
                      <a href={item.url} target="_blank" rel="noreferrer">
                        <span></span>
                      </a>
                    ) : (
                      <a href={item.url} target="_blank" rel="noreferrer">
                        <img src={item.img} alt={item.title} />
                      </a>
                    )}
                  </div>
                  <div className={classes.contentWrapper}>
                    <a href={item.newUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={classes.time}
                    >{`${item.start} - ${item.channel}`}</a>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className={classes.title}
                      title="Műsor megtekintése"
                    >
                      {item.title}
                    </a>
                    <span className={classes.info}>{item.summary}</span>
                    <p className={classes.desc}>{item.descr}</p>
                  </div>
                </div>
              ))}
            </>
          ))}
      </div>
      <div className={classes.filterWrapper}>
        <div id="introjsWelcomeMobile"></div>
        {days.length > 0 && (
          <div className={classes.dateContainer}>
            <button
              className={`${classes.buttons} ${!active ? classes.active : ""}`}
              onClick={(e) => counterHandler(2)}
            >
              <span className={classes.day}>{days[2].day_text}</span>
              <span className={classes.date}>
                {days[2].month} {days[2].day_num}
              </span>
            </button>
            <button
              className={`${classes.buttons} ${active ? classes.active : ""}`}
              onClick={(e) => counterHandler(counter)}
            >
              <span className={classes.day}>{days[counter].day_text}</span>
              <span className={classes.date}>
                {days[counter].month} {days[counter].day_num}
              </span>
            </button>
            <button
              className={classes.openDates}
              onClick={(e) => setDaysSelectorDropdown(!daysSelectorDropdown)}
            >
              <img src="/img/svg/downArrow.svg" alt="" style={{maxWidth: "unset"}} />
            </button>
            <div
              className={`${classes.daysSelector} ${
                daysSelectorDropdown ? classes.open : ""
              }`}
            >
              {days.map((day, index) => (
                <button
                  className={classes.daySelectorButtons}
                  onClick={(e) => counterHandler(index)}
                >
                  <span className={classes.daySelectorBold}>
                    {`${day.day_text} - `}
                    <span
                      className={classes.daySelectorRegular}
                    >{`${day.month} ${day.day_num}`}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className={classes.channelFilterEditContainer}>
          {isMobile && !isSingleChannel() && (
            <div className={classes.channelFilterMobile}>
              <ChannelFilter
                categories={categories}
                onSelectChange={onSelectChange}
              />
            </div>
          )}
          {isMobile && (
            <div
              className={`${classes.searchFilterContainer} ${
                expandSearchField ? classes.expand : ""
              }`}
            >
              <div className={classes.inputFieldWrapper}>
                <input
                  className={`${classes.inputField} ${
                    expandSearchField ? "" : classes.hide
                  }`}
                  ref={inputRef}
                  type="text"
                  placeholder="Műsor keresése"
                  name=""
                  id=""
                />
              </div>
              <button
                className={classes.searchButton}
                onClick={(e) => setExpandSearchField(!expandSearchField)}
              >
                <BsSearch className={classes.searchIcon} />
              </button>
            </div>
          )}
          <button className={classes.modalButton} onClick={onModalOpen}>
          <img src="/img/svg/favoriteChannel.svg" alt="" style={{maxWidth: "unset"}} />
            {/* <RiHeartAddFill className={classes.editFavIcon} /> */}
           {/*  <BsFillHeartFill className={classes.editFavIcon} /> */}
          </button>
        </div>
        <div className={classes.programFilterContainer}>
          <div id="introjsWelcome"></div>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterFilm
            } ${programFilter.film ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("film")}
          >
            Film
          </button>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterSeries
            } ${programFilter.sorozat ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("sorozat")}
          >
            Sorozat
          </button>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterSport
            } ${programFilter.sport ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("sport")}
          >
            Sport
          </button>
          {/* <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterSportLive
            } ${programFilter.sportLive ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("sportLive")}
          >
            Sport (élő)
          </button> */}
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterReality
            } ${programFilter.reality ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("reality")}
          >
            Reality
          </button>
          <button
            className={`${classes.programFilterButtons} ${
              classes.programFilterGastro
            } ${programFilter.gastro ? classes.isOn : ""}`}
            onClick={(e) => programFilterHandler("gastro")}
          >
            Gasztró
          </button>
        </div>
        {isDesktop && (
          <div
            className={`${classes.searchFilterContainer} ${
              expandSearchField ? classes.expand : ""
            }`}
          >
            <div className={classes.inputFieldWrapper}>
              <input
                className={`${classes.inputField} ${
                  expandSearchField ? "" : classes.hide
                }`}
                ref={inputRef}
                type="text"
                placeholder="Műsor keresése"
                name=""
                id=""
              />
            </div>
            <button
              className={classes.searchButton}
              onClick={(e) => setExpandSearchField(!expandSearchField)}
            >
              <BsSearch className={classes.searchIcon} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterList;
