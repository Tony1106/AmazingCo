import React from "react";
import { Image } from "semantic-ui-react";
import styles from "./CartItem.module.css";
export default function CartItem(props) {
  const {
    event,
    price,
    image,
    quantity,
    totalAfterPromo
  } = props.applyPromoData;
  return (
    <div className={styles.itemWrap}>
      <Image src={image} size="tiny" rounded />
      <div>{event}</div>
      <div>{quantity}</div>
      <div>{`${price}$`}</div>
      <div>{`${price * quantity}$`}</div>
      <div>{`${totalAfterPromo}$`}</div>
    </div>
  );
}
