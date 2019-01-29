import React from "react";
import ProductItem from "../component/ProductItem";
import styles from "./styles/ProductPage.module.css";
export default function ProductPage() {
  return (
    <div className={styles.container}>
      {" "}
      <h1>List Product Page</h1>
      <div className={styles.wrapItem}>
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
}
