import { useEffect } from "react";

//import { ado } from "./adOcean.js";

import classes from "./AdItemTop.module.css";

const AdItemTop = (props) => {
  useEffect(() => {}, []);

  //window.ado.slave('adoceanindexhuqplmcsphle', {myMaster: 'N7CmXSrA8sU6C2.k69bI6CsovYAjH4cgo.eSqOHkpJn.V7' });
const zone = {
  "id": "adoceanindexhuqplmcsphle",
  "empty": true,
  "lazy": false,
  "quality": true,
  "masterless": false, 
  "area": "Port_TV_Nyito_HP",
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
/* useEffect(() =y {
  typeof() window.ADOLoader
}, []); */
if (typeof window.ADOLoader === "undefined") {
  window.iap_zones = window.iap_zones || [];
  window.iap_zones.push(zone);
}else {
  window.ADOLoader.AdEngine.append(zone, callback)
}

  return (
    <div className={classes.adItem}>
      <div className={classes.adContent}>
        <div className="iap iap--ado empty bg--transparent" id="adoceanindexhuqplmcsphle" data-id="adoceanindexhuqplmcsphle"></div>
      </div>
    </div>
  );
};

export default AdItemTop;
