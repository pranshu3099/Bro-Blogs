import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
const useFetch = (url, info, method, headers, dependency = []) => {
  const [data, setData] = useState();
  const [err, setError] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    switch (method) {
      case "GET":
        setLoading(true);
        axios
          .get(url, { headers })
          .then((response) => {
            if (mounted && response.status === 200 && !data) {
              setData(response.data);
            }
          })
          .catch((err) => {
            // setError(err.response.data.error);
          })
          .finally(() => {
            setLoading(false);
          });
        break;
      case "POST":
        setLoading(true);
        axios
          .post(url, info)
          .then((response) => {
            if (response.status === 200) {
              setData(response.data);
            }
          })
          .catch((err) => {
            // setError(err.response.data.error);
          })
          .finally(() => {
            setLoading(false);
          });
        break;
      default:
        throw new Error("Method is Invalid");
    }
    return () => {
      mounted = false;
    };
  }, [url, headers, info, method, ...dependency]);
  return { data, err, loading };
};

export default useFetch;
