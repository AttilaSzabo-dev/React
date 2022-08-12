import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import SingleChannelItem from "./SingleChannelItem";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import classes from "./SingleChannelList.module.css";
import FilterList from "../filter-items/FilterList";
import Spinner from "../../UI/Spinner";
import { useMemo } from "react";

const SingleChannelList = ({ initData }) => {
  const [singleProgramArray, setSingleProgramArray] = useState(null);
  const [forwardRefValue, setForwardRefValue] = useState(0);
  const container = useRef(null);
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);
  const params = useParams();

  const isDesktop = useMediaQuery({ query: "(min-width: 500px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 499px)" });

  useEffect(() => {
    console.log("window.location.href: ", window.location.href);
    console.log(window.location.href.split("date=")[1]);
    console.log(
      "unix: ",
      new Date(window.location.href.split("date=")[1]) / 1000
    );
    //console.log("params.channelId: ", params.channelId);
    //console.log("params.channelname: ", params.channelName);
    let channelId = params.channelId.split("?")[0];
    setIsLoading(true);
    fetch(
      `https://port.hu/tvapi?channel_id=${channelId}&i_datetime_from=${
        initData.daysDate[0].split("T")[0]
      }&i_datetime_to=${initData.daysDate[14].split("T")[0]}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let singleProgramVariable = data;
        let tempArray = [];
        Object.keys(singleProgramVariable).map((key) =>
          //console.log(key);
          //console.log(singleProgram[key]);

          tempArray.push({ [key]: singleProgramVariable[key] })
        );
        setSingleProgramArray(tempArray);
        setIsLoading(false);
        //setSingleProgram(data);
        //singleProgramVariable = data;
        //setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        //setError(error.message);
      });
    if (
      typeof window.pp_gemius_hit === "function" &&
      typeof window.gemius_identifier === "string"
    ) {
      //aloldal gemius kod
      let code = "nS01l.MEgV5oZImyqtlj0JaE33kpsPtPCr5ONH2P1RD.D7";
      if (window.gemius_identifier !== code) {
        window.pp_gemius_hit(code);
        window.gemius_identifier = "";
      }
    }
  }, [initData, params.channelId]);

  const goLeft = () => {
    container.current.scrollLeft -= 300;
  };

  const goRight = () => {
    container.current.scrollLeft += 300;
  };

  const initScroll = (value) => {
    let positionToScroll;

    if (isMobile) {
      if (value !== 0) {
        positionToScroll = value * forwardRefValue + 2;
      }
    }else {
      if (value !== 0) {
        positionToScroll = value * 300;
      }
    }
    container.current.scrollLeft += positionToScroll;
  };

  const findIndex = () => {
    const resultIndex = singleProgramArray.findIndex(
      (item) =>
        Object.values(item)[0].formattedDate.split("T")[0] ===
        window.location.href.split("date=")[1]
    );
    initScroll(resultIndex);
  };

  const sendOffsetHandler = (value) => {
    setForwardRefValue(value)
  };

  useEffect(() => {
    if (singleProgramArray !== null) {
      findIndex();
    }
  }, [singleProgramArray, forwardRefValue]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className={classes.singleChannelLogoWrapper}>
        {singleProgramArray !== null && (
          <img
            src={Object.values(singleProgramArray[0])[0].channels[0].logo}
            alt="Logo"
          />
        )}
        <button
          onClick={goLeft}
          className={`${classes.leftButton} ${classes.buttons}`}
        >
          <MdKeyboardArrowLeft className={classes.arrows} />
        </button>
        <button
          onClick={goRight}
          className={`${classes.rightButton} ${classes.buttons}`}
        >
          <MdKeyboardArrowRight className={classes.arrows} />
        </button>
      </div>
      <div ref={container} className={classes.singleChannelWrapper}>
        {singleProgramArray !== null &&
          singleProgramArray.map((day) => {
            return (
              <SingleChannelItem
                day={Object.keys(day)[0]}
                programs={day[Object.keys(day)[0]]}
                sendOffset={sendOffsetHandler}
              />
            );
          })}
      </div>
    </>
  );
};

export default SingleChannelList;
