import React, { useState } from "react";
import { Avatar, Card, Col, Row, Select, Typography } from "antd";

import { useQuery } from "react-query";
import { getCryptoNews, getLimitCoins } from "../utils/Apis";
import styles from "./style.module.css";
import moment from "moment";

type Props = {
  simplified?: boolean;
};

const News: React.FC<Props> = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useQuery("category", () => getLimitCoins(100));
  const { data: cryptoNews } = useQuery(["news", newsCategory], () =>
    getCryptoNews(newsCategory, simplified ? 6 : 10)
  );

  const { Title } = Typography;
  const { Option } = Select;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            placeholder={"Select a Crypto"}
            className={styles.selectNews}
            onChange={(value) => setNewsCategory(value)}
          >
            <Option value={"Cryptocurrency"}>Cryptocurrency</Option>
            {data?.coins.map((item) => (
              <Option value={item.name}>{item.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.map((news) => (
        <Col xs={24} sm={12} lg={8}>
          <Card className={styles.newsCard}>
            <a href={news.url} target={"_blank"}>
              <div className={styles.newsImageContainer}>
                <Title level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl} />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className={styles.providerContainer}>
                <div className={styles.providerContent}>
                  <Avatar
                    src={news?.provider[0]?.image?.thumbnail?.contentUrl}
                  />
                  <p className={styles.providerName}>
                    {news?.provider[0].name}
                  </p>
                </div>
                <p>{moment(news.datePublished).startOf("week").fromNow()}</p>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
