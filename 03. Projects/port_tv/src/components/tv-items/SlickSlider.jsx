import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./SlickSlider.module.css";

const SlickSlider = () => {
  const [sliderData, setSliderData] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetch("tvapi/proposer")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSliderData(data);
        console.log("proposer: ", data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <Slider {...settings}>
      {sliderData.length > 0 && sliderData.map((item) => (
        <div className={classes.container}>
          <a className={classes.mainLink} href={item.data.url}>
            <img
              className={classes.image}
              src={item.data.image}
              alt={item.data.title}
            />
            <span className={classes.title}>{item.data.title}</span>
            <a className={classes.channelLink} href={item.data.channelLink}>
              <span className="time">{item.data.time}</span>
              <span className="channel">{item.data.channelName}</span>
            </a>
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default SlickSlider;
