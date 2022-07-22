import { useEffect, useRef } from "react";
import "./ad.css";

const AdVirtual = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(()=> {

    const zone = {
      "id": zones.tv_virtual_sponsoration.id,
      "empty": true,
      "lazy": false,
      "quality": zones.tv_virtual_sponsoration.quality,
      "masterless": zones.tv_virtual_sponsoration.masterless, 
      "area": zones.tv_virtual_sponsoration.area, /* Virtual channel */
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
        <div ref={adRef} className="iap iap--ado empty bg--transparent" id={zones.tv_virtual_sponsoration.id} data-id={zones.tv_virtual_sponsoration.id}></div>
      </div>
    </div>
  );
};

export default AdVirtual;
