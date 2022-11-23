import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Avatar, Button, Menu, Typography } from "antd";
import icon from "../images/cryptocurrency.png";
import { Link } from "react-router-dom";

import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";

const Navbar = (): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<number | undefined>();

  useEffect(() => {
    const handleSize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleSize);

    handleSize();

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoContainer}>
        <Avatar src={icon} size={"large"} />
        <Typography.Title level={2} className={styles.logo}>
          <Link to={"/"}> CryptoVerse</Link>
        </Typography.Title>
        <Button
          className={styles.menuControl}
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme={"dark"} className={styles.antMenu}>
          <Menu.Item icon={<HomeOutlined />}>
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to={"/cryptocurrencies"}>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to={"/exchanges"}>Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to={"/news"}>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
