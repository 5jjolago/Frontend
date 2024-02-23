import React from "react";
import { useState } from "react";

import Elastic from "./Elastic";

function Dashboard() {
  const [seoulDistricts, setSeoulDistricts] = useState([]);

  const handleDataReceived = (data) => {
    setSeoulDistricts(data);
  };

  // 배열 요소를 쿼리 문자열에 추가
  const query = seoulDistricts
    .map((district) => `sggnm.keyword:"${district}"`)
    .join("%20OR%20");

  // 쿼리 문자열을 적절한 형식으로 포맷
  const formattedQuery = `query:(language:kuery,query:'${query}')`;

  const source =
    "https://13.125.155.23:5601/app/dashboards?auth_provider_hint=anonymous1#/view/9f916a24-8c3e-4d39-a8d7-dc54bc0a3373?embed=true&_g=(refreshInterval:(pause:!f,value:900000),time:(from:now-7d%2Fd,to:now))&_a=(" +
    `${formattedQuery}` +
    ")&hide-filter-bar=true";

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Elastic onDataReceived={handleDataReceived} />
      <iframe
        src={source}
        style={{ width: "100%", height: "100%" }}
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default Dashboard;
