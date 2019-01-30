import React, { Component } from "react";
import { Image, Input } from "semantic-ui-react";

import styles from "./ProductItem.module.css";
export default class ProductItem extends Component {
  state = {
    value: 1
  };
  handleChange(value) {
    this.setState({ value });
  }
  handleClick() {
    let { id } = this.props.product;
    let { value } = this.state;
    this.props.addToCart({ id, value });
  }
  render() {
    const { description, event, price, image } = this.props.product;

    return (
      <div className={styles.wrap}>
        <Image
          src={image ? image : null}
          size="medium"
          rounded
          style={{ width: "200px" }}
        />
        <div>{event}</div>
        <div>{description}</div>
        <div className={styles.addToCart}>
          <Input
            action={{
              color: "teal",
              labelPosition: "left",
              icon: "cart",
              content: "Add To Cart",
              onClick: () => this.handleClick()
            }}
            actionPosition="left"
            placeholder="Quantity"
            // defaultValue="1"
            type="number"
            onChange={(e, { value }) => this.handleChange(value)}
            value={this.state.value}
          />
        </div>
        <div className={styles.price}>{price}</div>
      </div>
    );
  }
}
