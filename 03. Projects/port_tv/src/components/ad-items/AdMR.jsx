import { useEffect, useRef } from "react";
import "./ad.css";

const AdMR = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(()=> {

    const zone = {
      "id": zones.medium_rectangle_b.id,
      "empty": true,
      "lazy": false,
      "quality": zones.medium_rectangle_b.quality,
      "masterless": zones.medium_rectangle_b.masterless, 
      "area": zones.medium_rectangle_b.area, /* Medium Rectangle */
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

    if (typeof window.ADOLoader === "undefined") {
      window.iap_zones = window.iap_zones || [];
      window.iap_zones.push(zone);
    }else {
      const callback = () => {};
      window.ADOLoader.AdEngine.append(zone, callback)
    }
  }, [])
  

  return (
    <div className={"adItem"}>
      <div className={"adContent"}>
        <div ref={adRef} className="iap iap--ado empty bg--transparent" id={zones.medium_rectangle_b.id} data-id={zones.medium_rectangle_b.id}></div>
      </div>
    </div>
  );
};

export default AdMR;
