import { useEffect, useRef } from "react";
import "./ad.css";

const AdRich = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(()=> {
    const zone = {
      "id": zones.richmedia.id,
      "empty": true,
      "lazy": false,
      "quality": zones.richmedia.quality,
      "masterless": zones.richmedia.masterless, 
      "area": zones.richmedia.area, /* richmedia */
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
        <div ref={adRef} className="iap iap--ado empty bg--transparent" id={zones.richmedia.id} data-id={zones.richmedia.id}></div>
      </div>
    </div>
  );
};

export default AdRich;
