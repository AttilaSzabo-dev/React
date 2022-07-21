import { useEffect, useRef } from "react";
import "./ad.css";

const AdRBB = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(()=> {

    const zone = {
      "id": zones.roadblock_b.id,
      "empty": true,
      "lazy": false,
      "quality": zones.roadblock_b.quality,
      "masterless": zones.roadblock_b.masterless, 
      "area": zones.roadblock_b.area, /* Roadblock_B */
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
        <div ref={adRef} className="iap iap--ado empty bg--transparent" id={zones.roadblock_b.id} data-id={zones.roadblock_b.id}></div>
      </div>
    </div>
  );
};

export default AdRBB;
