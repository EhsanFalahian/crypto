import React, { useState } from "react";
import { Col, Row, Select, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCoinDetails, getCoinHistory } from "../utils/Apis";
import styles from "./style.module.css";
import millify from "millify";
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";

const CryptocurrencyDetails = (): JSX.Element => {
  const [timePeriod, setTimePeriod] = useState<string>("7d");
  const { id } = useParams();
  const { data } = useQuery("coinDetails", () => getCoinDetails(id));
  const { data: coinHistory } = useQuery(["coinHistory", timePeriod], () =>
    getCoinHistory(id, timePeriod)
  );

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const { Title, Text } = Typography;
  const { Option } = Select;
  const cryptoDetails = data?.coin;
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${
        cryptoDetails?.price && millify(parseInt(cryptoDetails?.price))
      }`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.volume && millify(parseInt(cryptoDetails?.volume))
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(parseInt(cryptoDetails?.marketCap))
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(parseInt(cryptoDetails?.allTimeHigh?.price))
      }`,
      icon: <TrophyOutlined />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total &&
        millify(parseInt(cryptoDetails?.supply?.total))
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(parseInt(cryptoDetails?.supply?.circulating))
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className={styles.coinDetailContainer}>
      <Col className={styles.coinHeadingContainer}>
        <Title level={2}>
          {data?.coin.name} ({data?.coin?.symbol}) Price
        </Title>
        <p>
          {data?.coin?.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        className={styles.selectTimePeriod}
        defaultValue={"7d"}
        placeholder={"Select TimePeriod"}
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        coinName={data?.coin.name}
        currentPrice={data?.coin?.price && millify(parseInt(data.coin.price))}
      />
      <Col className={styles.statsContainer}>
        <Col>
          <Col>
            <Title level={3}>{cryptoDetails?.name} Value Statistics</Title>
            <p>
              An overview showing the statistics of {cryptoDetails?.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ title, value, icon }) => (
            <Col className={styles.coinStats}>
              <Col className={styles.coinStatsName}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className={styles.stats}>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col>
          <Col>
            <Title level={3}>Other Stats Info</Title>
            <p>
              An overview showing the statistics of {cryptoDetails?.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ title, icon, value }) => (
            <Col className={styles.coinStats}>
              <Col className={styles.coinStatsName}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className={styles.stats}>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className={styles.coinDeskLink}>
        <Row className={styles.coinDesk}>
          <Title level={3}>What is {cryptoDetails?.name}?</Title>
          {cryptoDetails?.description &&
            HTMLReactParser(cryptoDetails.description)}
        </Row>

        <Col className={styles.coinLinks}>
          <Title level={3}>{cryptoDetails?.name} Links</Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className={styles.coinLink}>
              <Title level={3}>{link.name}</Title>
              <a href={link.url} target={"_blank"}>
                {link.type}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptocurrencyDetails;
