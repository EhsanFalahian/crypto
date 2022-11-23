import React from "react";
import { Col, Row, Statistic, Typography } from "antd";
import { useQuery } from "react-query";
import { getCoins } from "../utils/Apis";
import millify from "millify";
import Cryptocurrencies from "./Cryptocurrencies";
import { inspect } from "util";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import News from "./News";

const Home = (): JSX.Element => {
  const { Title } = Typography;
  const { data } = useQuery("stats", () => getCoins());

  return (
    <>
      <Title level={2}>Global Crypto Stats</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic
            title={"Total Cryptocurrencies"}
            value={data?.stats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total Exchanges"}
            value={
              data?.stats.totalExchanges && millify(data.stats.totalExchanges)
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total Market Cap"}
            value={
              data?.stats.totalMarketCap &&
              `$${millify(parseInt(data.stats.totalMarketCap))}`
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total 24h Volume"}
            value={
              data?.stats.total24hVolume &&
              `$${millify(parseInt(data?.stats.total24hVolume))}`
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total Markets"}
            value={
              data?.stats.totalMarkets && millify(data?.stats.totalMarkets)
            }
          />
        </Col>
      </Row>
      <div className={styles.homeHeadingContainer}>
        <Title level={2} className={styles.homeTitle}>
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className={styles.showMore}>
          <Link to={"/cryptocurrencies"}> Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className={styles.homeHeadingContainer}>
        <Title level={2} className={styles.homeTitle}>
          Latest Crypto News
        </Title>
        <Title level={3} className={styles.showMore}>
          <Link to={"/news"}>Show more</Link>
        </Title>
      </div>
      <News simplified={true} />
    </>
  );
};

export default Home;
