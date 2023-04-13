import axios from "axios";
import { useEffect, useState } from "react";
const useFetch = (url, info, method) => {
  const [data, setData] = useState();
  const [err, setError] = useState();
  useEffect(() => {
    switch (method) {
      case "GET":
        axios
          .get(url)
          .then((response) => {
            if (response.status === 200) {
              setData(response.data);
            }
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
        break;
      case "POST":
        axios
          .post(url, info)
          .then((response) => {
            if (response.status === 200) {
              setData(response.data);
            }
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
        break;
      default:
        throw new Error("Method is Invalid");
    }
  }, [url, info, method]);
  return { data, err };
};

export default useFetch;
