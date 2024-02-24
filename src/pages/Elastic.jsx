import React, { useEffect, useState } from "react";
import axios from "axios";

const Elastic = ({ onDataReceived }) => {
  const [data, setData] = useState(null);
  const ElasticAPIKey =
    "Xy1TcjFJMEJOSVVDY0UxTkJJWUs6YUw0eXgtWkJSZkNXQnpfM1FOZ2FIZw==";

  const query =
    '{ "index": "education-data-classify" }\n{ "query": { "match": { "유치원_개수_분류": "중" } }, "sort": [{ "_score": { "order": "desc" }}] }\n{ "index": "wellfare-data-classify" }\n{ "query": { "match": { "체육시설_수_분류": "중" } }, "sort": [{ "_score": { "order": "desc" }}] }\n';

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        method: "post",
        url: "https://13.125.155.23:9200/_msearch",
        headers: {
          "Content-Type": "application/x-ndjson",
          Authorization: `ApiKey ${ElasticAPIKey}`,
        },
        data: query, //검색하고자 하는 지표
      });

      const regions = response.data.responses
        .flatMap((response) => response.hits.hits) // 모든 "hits" 배열을 하나의 배열로 평탄화
        .map((hit) => hit._source.지역); // 각 "hit"의 "_source" 객체에서 "지역" 필드의 값을 추출

      setData(regions);
      onDataReceived(regions); // 데이터를 상위 컴포넌트로 전달
    };
    fetchData();
  }, []);

  return <div></div>;
};

export default Elastic;
