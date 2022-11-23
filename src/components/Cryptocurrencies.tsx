import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row } from "antd";
import { useQuery } from "react-query";
import { getLimitCoins } from "../utils/Apis";
import { Link } from "react-router-dom";
import { Coins, CoinsContent } from "../type";
import { inspect } from "util";
import styles from "./style.module.css";
import millify from "millify";

type Props = {
  simplified?: boolean;
};

const Cryptocurrencies: React.FC<Props> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [cryptoList, setCryptoList] = useState<CoinsContent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data } = useQuery("coins", () => getLimitCoins(count));

  useEffect(() => {
    if (data) {
      setCryptoList(data?.coins);
      const filterData = cryptoList?.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      {
        searchTerm !== "" && setCryptoList(filterData);
      }
    }
  }, [data, searchTerm]);
  return (
    <>
      {!simplified && (
        <div className={styles.searchCrypto}>
          <Input
            placeholder={"Search Cryptocurrency"}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className={styles.cryptoCartContainer}>
        {cryptoList?.map((currency) => (
          <Col className={styles.cryptoCard} xs={24} sm={16} lg={6}>
            <Link to={`/cryptocurrencyDetails/${currency.uuid}`}>
              <Card
                title={`${currency.rank} . ${currency.name}`}
                extra={
                  <img className={styles.cryptoImage} src={currency.iconUrl} />
                }
                hoverable
              >
                <p>Price: {millify(parseInt(currency?.price))}</p>
                <p>Market Cap: {millify(parseInt(currency?.marketCap))}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
