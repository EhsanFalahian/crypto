import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://bing-news-search1.p.rapidapi.com";

export interface NewsApiResponse<Items = unknown> {
  status: "failed" | "succeed";
  message: string;
  value: Items;
}

const options = {
  url: BASE_URL,

  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "3b30b556f1msh0d53de73f64ef83p1c3454jsn65f10e7b2a9e",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
};

export async function getNews<T extends NewsApiResponse>(
  url: string
): Promise<AxiosResponse<T>> {
  return axios.get(`${BASE_URL}/${url}`, options);
}
