import React from "react";
import styles from "./sinaappbar.module.css";
import SinaBrand from "@/components/atoms/SinaBrand";

const SinaAppBar = () => {
  return (
    <div className={styles.sinappbar_container}>
      <SinaBrand />
    </div>
  );
};

export default SinaAppBar;
