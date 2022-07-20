import { useEffect } from "react";

//import { ado } from "./adOcean.js";

const AdFejlecCsik = (props) => {
  useEffect(() => {}, []);
  
  let zones = window.zonesToLoad;
  const zone = {
    "id": zones.tv_top_sponsoration.id,
    "empty": true,
    "lazy": false,
    "quality": zones.tv_top_sponsoration.quality,
    "masterless": zones.tv_top_sponsoration.masterless, 
    "area": zones.tv_top_sponsoration.area,
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
  
const callback = () => {};
if (typeof window.ADOLoader === "undefined") {
  window.iap_zones = window.iap_zones || [];
  window.iap_zones.push(zone);
}else {
  window.ADOLoader.AdEngine.append(zone, callback)
}

  return (
    <div className={"adItem"}>
      <div className={"adContent"}>
        <div className="iap iap--ado empty bg--transparent" id="ado-Mqg6o_c1kzLL3.Khb3HdcsSXkary6abuTFfNZ9J7aWH.P7" data-id="ado-Mqg6o_c1kzLL3.Khb3HdcsSXkary6abuTFfNZ9J7aWH.P7"></div>
      </div>
    </div>
  );
};

export default AdFejlecCsik;
