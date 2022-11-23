import React from "react";
import { CoinHistory } from "../type";
import { Col, Row, Typography } from "antd";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import styles from "./style.module.css";

Chart.register(CategoryScale);
type Props = {
  coinHistory?: CoinHistory;
  coinName?: string;
  currentPrice?: string;
};

const LineChart: React.FC<Props> = ({
  coinHistory,
  coinName,
  currentPrice,
}) => {
  const { Title } = Typography;
  const coinPrice = [];
  const coinTimestamp = [];
  {
    if (coinHistory) {
      for (let i = 0; i < coinHistory?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.history[i].price);
        coinTimestamp.push(
          new Date(coinHistory?.history[i].timestamp).toLocaleDateString()
        );
      }
    }
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className={styles.chartHeader}>
        <Title level={2}>{coinName} Price Chart</Title>
        <Col className={styles.priceContainer}>
          <Title level={5} className={styles.currentPrice}>
            Change: {coinHistory?.change}%
          </Title>
          <Title level={5} className={styles.currentPrice}>
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
