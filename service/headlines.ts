import axios from "axios";
import { APP_CONFIG } from "../config";

const getHeadlinesRequest = () => {
  try {
    return axios
      .get(
        `https://newsapi.org/v2/top-headlines?pageSize=100&category=general&apiKey=${APP_CONFIG.NEWS_API_KEY}`
      )
      .then((res) => res)
      .catch((err) => err);
  } catch (error) {
    return error;
  }
};

export { getHeadlinesRequest };
