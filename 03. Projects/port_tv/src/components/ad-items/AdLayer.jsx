import { useEffect, useRef } from "react";
import "./ad.css";

const AdLayer = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(()=> {
    const zone = {
      "id": zones.layer.id,
      "empty": true,
      "lazy": false,
      "quality": zones.layer.quality,
      "masterless": zones.layer.masterless, 
      "area": zones.layer.area, /* Layer */
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
  }, [])
  

  return (
    <div className={"adItem"}>
      <div className={"adContent"}>
        <div ref={adRef} className="iap iap--ado empty bg--transparent ad-label--hidden no-margin" id={zones.layer.id} data-id={zones.layer.id}></div>
      </div>
    </div>
  );
};

export default AdLayer;