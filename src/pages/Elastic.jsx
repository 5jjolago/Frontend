import React, { useEffect, useState } from "react";
import axios from "axios";

const Elastic = ({ onDataReceived }) => {
  const [data, setData] = useState(null);
  const ElasticAPIKey =
    "Rm1vaV9vMEJPX1d4QU1FNmhhZDY6aFNDei1oZS1TVG1DZGw3dm5KempzUQ==";

  const query = {
    query: {
      match: {
        초등학교_지역구별_개수_분류: "하",
      },
      match: {
        학원_지역구별_개수_분류: "하",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        method: "post",
        url: "http://elasticsearch.nalraon.kr/education-data-classify/_search", // Elasticsearch 서버 URL을 적절히 수정해주세요.
        headers: {
          "Content-Type": "application/x-ndjson",
          Authorization: `ApiKey ${ElasticAPIKey}`,
        },
        data: query, //검색하고자 하는 지표
      });
      const regions = response.data.hits.hits.map((item) => item._source.지역);
      setData(regions);
      onDataReceived(regions); // 데이터를 상위 컴포넌트로 전달
    };
    fetchData();
  }, []);

  return <div></div>;
};

export default Elastic;
