import React, { Component } from "react";
import { Image, Input } from "semantic-ui-react";
import styles from "./ProductItem.module.css";
export default class ProductItem extends Component {
  render() {
    return (
      <div className={styles.wrap}>
        <Image
          src="https://images.ctfassets.net/zggpk8714k6l/2g405SBgMAUoAmUqAeGyia/a8f1843f703f9784e016464c87399c3a/Instagram-_grandmaontour-paris-france.jpg"
          size="medium"
          rounded
          //   style={{ height: "300px" }}
        />
        <div>description</div>
        <div className={styles.addToCart}>
          <Input
            action={{
              color: "teal",
              labelPosition: "left",
              icon: "cart",
              content: "Add To Cart"
            }}
            actionPosition="left"
            placeholder="Quantity"
            defaultValue="1"
            type="number"
          />
        </div>
        <div className={styles.price}>Price</div>
      </div>
    );
  }
}
