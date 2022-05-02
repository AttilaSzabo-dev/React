import { useState, useEffect, useCallback } from "react";
import { useInView } from 'react-intersection-observer';

import AllChannelItem from "./AllChannelItem";

import classes from "./AllChannelsList.module.css";

const AllChannelsList = ({ tvEventInit }) => {
  const [programs, setPrograms] = useState([]);
  const [actualUrlsIndex, setActualUrlsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const pluck = (array, key) => {
    return array.map((item) => item[key]);
  };

  function* chunk(array, n) {
    for (let index = 0; index < array.length; index += n) {
      yield array.slice(index, index + n);
    }
  }

  const fetchActualUrl = useCallback(
    (urls) => {
      setIsLoading(true);
      fetch(`${urls[actualUrlsIndex]}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("apiFetch: ", data);
          setPrograms((prevPrograms) => {
            return [
              ...prevPrograms,
              {
                channels: data.channels,
                date: data.date,
                date_from: data.date_from,
                date_to: data.date_to,
                eveningStartTime: data.eveningStartTime,
              },
            ];
          });
          setIsLoading(false);
        }).catch((error) => {
          setError(error.message);
        });
    },
    [actualUrlsIndex]
  );

  const increseHandler = () => {
    setActualUrlsIndex(actualUrlsIndex + 1);
  };

  /* let content = <p></p>;

  if (false) {
    content = <AllChannelsList allProgram={tvEventInit} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  } */

  console.log("tároló state: ", programs);

  useEffect(() => {
    let date = `date=${tvEventInit.date.split("T")[0]}`;
    let ids = pluck(tvEventInit.channels, "id");
    let chunks = [...chunk(ids, 40)];
    let urls = chunks.map((chunk) => {
      let channels = chunk.map((id) => `channel_id%5B%5D=${id}`).join("&");
      return `tv-event/api?${channels}&${date}`;
    });

    console.log("ids: ", ids);
    console.log("chunks: ", chunks);
    console.log("urls: ", urls);

    fetchActualUrl(urls);
  }, [fetchActualUrl, tvEventInit.date, tvEventInit.channels]);

  return (
    <div className={classes.channelsWrapper}>
      {programs.length !== 0 &&
        programs.map((program) => <AllChannelItem programs={program} />)}
      {(programs.length !== 0 && isLoading === false) && <button ref={ref} onClick={increseHandler}>Increse {inView}</button>}
    </div>
  );
};

export default AllChannelsList;
