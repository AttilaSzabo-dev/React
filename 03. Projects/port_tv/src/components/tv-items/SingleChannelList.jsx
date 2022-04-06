import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import SingleChannelItem from "./SingleChannelItem";

import classes from "./SingleChannelList.module.css";

const SingleChannelList = ({ daysDate }) => {
  const [singleProgram, setSingleProgram] = useState(null);
  const [singleProgramArray, setSingleProgramArray] = useState(null);
  const params = useParams();

  const fetchSinglePrograms = useCallback(async () => {
    //setIsLoading(true);
    //setError(null);
    try {
      const response = await fetch(
        `tvapi?channel_id=${params.channelId}&i_datetime_from=${
          daysDate[0].split("T")[0]
        }&i_datetime_to=${daysDate[14].split("T")[0]}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setSingleProgram(await response.json());
    } catch (error) {
      console.log(error);
      //setError(error.message);
    }
    //setIsLoading(false);
  }, [params.channelId, daysDate]);

  useEffect(() => {
    fetchSinglePrograms();
  }, [fetchSinglePrograms]);

  if (singleProgram !== null) {
    console.log(singleProgram);
    setSingleProgramArray(Object.keys(singleProgram).map((key) => {
      console.log(key);
      console.log(singleProgram[key]);

      return { [key]: singleProgram[key] };
    }));
  }

  return (
    <div>
      {/* {singleProgramArray !== null &&
        singleProgramArray.map((program, i) => {
          return (
            <SingleChannelItem
              key={i}
              formattedDate={program.formattedDate.split("T")[0]}
              today={program.date.split("T")[0]}
              programs={program.channels[0].programs}
            />
          );
        })} */}
    </div>
  );
};

export default SingleChannelList;
