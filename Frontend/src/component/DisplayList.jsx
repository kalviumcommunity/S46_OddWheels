import React, { useEffect } from "react";
import axios from "axios";

export const DisplayList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://till-usually-1338.codedamn.app/doors")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      {data.map((dataset, index) => {
        return <div key={index}>{dataset.image}</div>;
      })}
    </>
  );
};
