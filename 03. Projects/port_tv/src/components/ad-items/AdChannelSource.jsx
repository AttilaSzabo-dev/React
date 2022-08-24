import { useEffect, useRef } from "react";
import "./ad.css";

const AdChannelSource = () => {
  const adRef = useRef();
  const zones = window.zonesToLoad;

  useEffect(()=> {
    const zone = {
      "id": zones.tv_channel_sponsoration.id,
      "empty": true,
      "lazy": false,
      "quality": zones.tv_channel_sponsoration.quality,
      "masterless": zones.tv_channel_sponsoration.masterless, 
      "area": zones.tv_channel_sponsoration.area, /* tv_channel_sponsoration */
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
        <div ref={adRef} className="iap iap--ado empty bg--transparent ad-label--hidden no-margin" id={zones.tv_channel_sponsoration.id} data-id={zones.tv_channel_sponsoration.id}></div>
      </div>
    </div>
  );
};

export default AdChannelSource;