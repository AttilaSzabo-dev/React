import { useState, useEffect, useCallback } from "react";
import AllChannelItem from "./AllChannelItem";

import classes from "./AllChannelsList.module.css";

const AllChannelsList = ({
  allProgram
}) => {

  let urlArray = [];
  let urlLength = 0;
  let urlTempLength = 0;

  let url = "";

  allProgram.channels.forEach((channel) => {
    url += `channel_id%5B%5D=${channel.id}&`;
    ++urlTempLength;
    ++urlLength;
    //console.log("urlTempLength: ", urlTempLength);
    if (urlTempLength === 40 || urlLength === allProgram.channels.length) {
      //console.log("url generáló ifben");
      //console.log(url);
      url += `date=${allProgram.date.split("T")[0]}`;
      urlArray.push(url);
      console.log(urlArray);
      //fetch(`tv-event/api?${url}`)
      //  .then((res) => {
      //    return res.json();
      //  })
      //  .then((data) => {
      //    console.log(data);
      //console.log("length set előtt: ", programs);
      /* setPrograms((prevPrograms) => {
              return [...prevPrograms, data];
              }); */
      //      setPrograms(data.channels);
      //console.log("length set után: ", programs);
      //    });
      url = "";
      urlTempLength = 0;
    }
  });

  //const [allProgram ,setAllProgram] = useState(null);
  //const [individualProgram ,setIndividualProgram] = useState(null);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);

  /* let url = "";
  let urlLength = 0;

  channels.forEach(channel => {
    url += `channel_id%5B%5D=${channel.id}&`;
    ++urlLength;
    if (urlLength === channels.length) {
      url += `date=${date}`;
    }
  }); */

  /* const fetchAllPrograms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`tv-event/api?${url}`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setAllProgram(await response.json());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [url]); */

  /* useEffect(() => {
    console.log("fetchAllPrograms");
    fetchAllPrograms();
  }, [fetchAllPrograms]); */

  let content = "";

  if (allProgram !== null) {
    //console.log(allProgram);
    content = allProgram.channels.map((item) => (
      <AllChannelItem key={item.id} id={item.id} logo={item.logo} programs={item.programs}/>
    ))
  }

  /* if (error) {
    content = <p>{error}</p>;
  } */

  /* if (isLoading) {
    content = <p>Loading...</p>;
  } */
  
  return (
    <div className={classes.channelsWrapper}>
      {content}
    </div>
  );
};

export default AllChannelsList;
