import { useEffect, useRef } from "react";
import "./ad.css";

const AdVirtualSource = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(()=> {
    const zone = {
      "id": zones.tv_virtual_sponsoration.id,
      "empty": true,
      "lazy": false,
      "quality": zones.tv_virtual_sponsoration.quality,
      "masterless": zones.tv_virtual_sponsoration.masterless, 
      "area": zones.tv_virtual_sponsoration.area, /* Virtual */
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
        <div ref={adRef} className="iap iap--ado empty bg--transparent ad-label--hidden no-margin" id={zones.tv_virtual_sponsoration.id} data-id={zones.tv_virtual_sponsoration.id}></div>
      </div>
    </div>
  );
};

export default AdVirtualSource;