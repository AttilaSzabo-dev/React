import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import SingleChannelItem from "./SingleChannelItem";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import classes from "./SingleChannelList.module.css";

const SingleChannelList = ({ daysDate }) => {
  const [singleProgramArray, setSingleProgramArray] = useState(null);
  const container = useRef(null);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(
      `https://port.hu/tvapi?channel_id=${params.channelId}&i_datetime_from=${
        daysDate[0].split("T")[0]
      }&i_datetime_to=${daysDate[14].split("T")[0]}`
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
        //setSingleProgram(data);
        //singleProgramVariable = data;
        //setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        //setError(error.message);
      });
  }, [daysDate, params.channelId]);

  const goLeft = () => {
    container.current.scrollLeft -= 300;
  };

  const goRight = () => {
    container.current.scrollLeft += 300;
  };

  console.log("singleProgramArray: ", singleProgramArray);
  if (singleProgramArray !== null) {
    /* console.log("Logo: ", singleProgramArray[0][Object.keys(singleProgramArray)[0]]); */
    console.log(
      "Logo: ",
      Object.values(singleProgramArray[0])[0].channels[0].logo
    );
  }

  return (
    <>
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
              />
            );
          })}
      </div>
    </>
  );
};

export default SingleChannelList;
