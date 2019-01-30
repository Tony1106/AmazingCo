import React from "react";
import { Image } from "semantic-ui-react";
import styles from "./CartItem.module.css";
export default function CartItem() {
  return (
    <div className={styles.itemWrap}>
      <Image
        src="https://images.ctfassets.net/zggpk8714k6l/2g405SBgMAUoAmUqAeGyia/a8f1843f703f9784e016464c87399c3a/Instagram-_grandmaontour-paris-france.jpg"
        size="tiny"
        rounded
      />
      <div>Product Name</div>
      <div>Quantity</div>
      <div>Price</div>
      <div>Total</div>
    </div>
  );
}
