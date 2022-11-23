import { ApiResponse, get } from "./cryptoApi";
import { CoinDetails, CoinHistory, Coins, News, Stats } from "../type";
import { getNews, NewsApiResponse } from "./newsApi";

export const getCoins = (): Promise<Stats> => {
  return get<ApiResponse<Stats>>("/coins").then((res) => res.data.data);
};
export const getLimitCoins = (count?: number): Promise<Coins> => {
  return get<ApiResponse<Coins>>(`/coins?limit=${count}`).then(
    (res) => res.data.data
  );
};

export const getCoinDetails = (id?: string): Promise<CoinDetails> => {
  return get<ApiResponse<CoinDetails>>(`/coin/${id}`).then(
    (res) => res.data.data
  );
};

export const getCryptoNews = (
  newsCategory?: string,
  count?: number
): Promise<News> => {
  return getNews<NewsApiResponse<News>>(
    `news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
  ).then((res) => res.data.value);
};

export const getCoinHistory = (
  id?: string,
  timePeriod?: string
): Promise<CoinHistory> => {
  return get<ApiResponse<CoinHistory>>(
    `coin/${id}/history?timeperiod=${timePeriod}`
  ).then((res) => res.data.data);
};
