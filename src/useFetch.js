import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("cant fetch the data from that resours");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch Aborted");
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
