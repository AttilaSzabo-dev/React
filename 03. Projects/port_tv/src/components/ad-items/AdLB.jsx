import { useEffect, useRef } from "react";
import "./ad.css";

const AdLB = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(()=> {
    const zone = {
      "id": zones.superleaderboard.id,
      "empty": true,
      "lazy": false,
      "quality": zones.superleaderboard.quality,
      "masterless": zones.superleaderboard.masterless, 
      "area": zones.superleaderboard.area, /* Leaderboard */
      "node": adRef.current,
      "events": {
        "loaded": false, 
        "visible": false,
        "viewed": false
      },
      "stat": {
        "site": "port",
        "path": "",
        "type": "tv/nyito"
      }
    }

    window.iap_zones = window.iap_zones || [];
    window.iap_zones.push(zone);
    console.log("LB");
  }, [])
  

  return (
    <div className={"adItem"}>
      <div className={"adContent"}>
        <div ref={adRef} className="iap iap--ado empty bg--transparent" id={zones.superleaderboard.id} data-id={zones.superleaderboard.id}></div>
      </div>
    </div>
  );
};

export default AdLB;
