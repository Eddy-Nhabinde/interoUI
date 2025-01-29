import axios from "axios";
import useSWR from "swr";


const BASE_URL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_BASE_TOKEN;

const requestHeader = () => {
  return {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      "Access-Control-Max-Age": "60",
    },
  };
};

const useFetch = (endpoint) => {

  const fetcher = async (...params) => {
    const res = await axios.get(...params, requestHeader());
    return res.data;
  };

  const { data, error } = useSWR(`${BASE_URL}/${endpoint}`, fetcher,/*,{ refreshInterval: 20000 }*/);

  return { data, isFetching: !data && !error, error };
};

export { useFetch, requestHeader, BASE_URL, TOKEN };
