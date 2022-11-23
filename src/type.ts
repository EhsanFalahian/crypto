export type Stats = {
  stats: {
    total: number;
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
  };
};

export type Coins = {
  coins: CoinsContent[];
};

export type CoinsContent = {
  uuid: string;
  rank: number;
  name: string;
  iconUrl: string;
  price: string;
  change: string;
  marketCap: string;
};

export type News = NewsContent[];

export type NewsContent = {
  name: string;
  url: string;
  description: string;
  datePublished: string;
  image: {
    thumbnail: {
      contentUrl: string;
    };
  };
  provider: [
    {
      name: string;
      image: {
        thumbnail: {
          contentUrl: string;
        };
      };
    }
  ];
};

export type CoinDetails = {
  coin: {
    name: string;
    symbol: string;
    price: string;
    numberOfMarkets: number;
    numberOfExchanges: number;
    rank: number;
    marketCap: string;
    description: string;
    volume: string;
    allTimeHigh: {
      price: string;
    };
    links: [
      {
        name: string;
        type: string;
        url: string;
      }
    ];
    supply: {
      confirmed: boolean;
      circulating: string;
      total: string;
    };
  };
};

export type CoinHistory = {
  change: string;
  history: [
    {
      price: string;
      timestamp: number;
    }
  ];
};
