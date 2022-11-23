import React from "react";
import Navbar from "./components/Navbar";
import styles from "./components/style.module.css";
import { Layout, Space, Typography } from "antd";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import Home from "./components/Home";
import Cryptocurrencies from "./components/Cryptocurrencies";
import Exchanges from "./components/Exchanges";
import CryptocurrencyDetails from "./components/CryptocurrencyDetails";
import News from "./components/News";
import reactQuery from "./utils/reactQuery";

function App() {
  return (
    <QueryClientProvider client={reactQuery}>
      <BrowserRouter>
        <div className={styles.app}>
          <div className={styles.navbar}>
            <Navbar />
          </div>
          <div className={styles.main}>
            <Layout>
              <div className={styles.routes}>
                <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route
                    path={"/cryptocurrencies"}
                    element={<Cryptocurrencies />}
                  />
                  <Route path={"/exchanges"} element={<Exchanges />} />
                  <Route
                    path={"/cryptocurrencyDetails/:id"}
                    element={<CryptocurrencyDetails />}
                  />
                  <Route path={"/news"} element={<News />} />
                </Routes>
              </div>
            </Layout>

            <div className={styles.footer}>
              <Typography.Title
                level={2}
                style={{ color: "white", textAlign: "center" }}
              >
                Cryptoverse <br /> All rights reserved{" "}
              </Typography.Title>
              <Space>
                <Link to={"/"}>Home</Link>
                <Link to={"/exchanges"}>Exchanges</Link>
                <Link to={"/news"}>News</Link>
              </Space>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
