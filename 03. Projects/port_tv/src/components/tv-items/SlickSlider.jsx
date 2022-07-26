import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AdMR from "../ad-items/AdMR";

import classes from "./SlickSlider.module.css";

const SlickSlider = () => {
  const [sliderData, setSliderData] = useState([]);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    focusOnSelect: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1367,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const zones = window.zonesToLoad;

  useEffect(() => {
    fetch("tvapi/proposer")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let dataArray = [...data];
        dataArray.splice(2, 0, "Ad");
        setSliderData(dataArray);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className={classes.sliderWrapper}>
      <Carousel
        additionalTransfrom={0}
        centerMode={false}
        focusOnSelect={false}
        infinite
        swipeable
        draggable
        minimumTouchDrag={80}
        showDots={false}
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      >
        {sliderData.length > 0 &&
          sliderData.map((item, index) => (
            <>
              {index === 2 && zones.medium_rectangle_b !== undefined && (
                <AdMR key={index} />
              )}
              {index !== 2 && (
                <a
                  key={index}
                  className={classes.mainLink}
                  href={item.data.url}
                >
                  <img
                    className={classes.image}
                    src={item.data.image}
                    alt={item.data.title}
                  />
                  <span className={classes.title}>{item.data.title}</span>
                  <a
                    className={classes.channelLink}
                    href={item.data.channelLink}
                  >
                    <span className={classes.time}>{item.data.time}</span>
                    <span className={classes.channel}>
                      {item.data.channelName}
                    </span>
                  </a>
                </a>
              )}
            </>
          ))}
      </Carousel>
    </div>
  );
};

export default SlickSlider;
