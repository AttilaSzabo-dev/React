import { useState, useEffect } from "react";
import "./ad.css";

const AdVirtual = () => {
  const [virtual, setVirtual] = useState({
    ct: "",
    img: "",
  });
  
  const zone = window.virtualChannelSponsoration;

  useEffect(()=> {
    setVirtual({
      ct: zone.ct,
      img: zone.img
    })
  }, [zone.ct, zone.img])
  

  return (
    <div className={"adItem"}>
      <div className={"adContent"}>
        <a href={virtual.ct}>
          <img src={virtual.img} alt="Virtual Channel" className="virtualImage" />
        </a>
      </div>
    </div>
  );
};

export default AdVirtual;
