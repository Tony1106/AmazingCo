import React, { Component } from "react";
import { Image, Input } from "semantic-ui-react";
import PropTypes from "prop-types";

import styles from "./ProductItem.module.css";
export default class ProductItem extends Component {
  state = {
    value: 1
  };
  handleChange(value) {
    this.setState({ value });
  }
  handleClick() {
    let {
      id,
      description,
      event,
      price,
      image,
      promoStatus,
      promoType
    } = this.props.product;
    let { value } = this.state;

    this.props.addToCart({
      id,
      value,
      description,
      event,
      price,
      image,
      promoStatus,
      promoType
    });
  }
  render() {
    const {
      description,
      event,
      price,
      image,
      promoStatus,
      promoType
    } = this.props.product;
    let promoText = "";
    if (promoStatus) {
      if (/groupBuy_offPrice/.test(promoType)) {
        let numPromoApply = +promoType.match(/\d+/g)[0];
        let percentApply = +promoType.match(/\d+/g)[1];
        promoText = `Buy ${numPromoApply} get the ${numPromoApply +
          1} off ${percentApply}%`;
      } else if (/groupBuy_getFree/.test(promoType)) {
        let numPromoApply = +promoType.match(/\d+/g)[0];
        promoText = `Buy ${numPromoApply} get the one free`;
      } else if (/directDiscount/.test(promoType)) {
        let percentApply = +promoType.match(/\d+/g)[0];
        promoText = `Buy any get ${percentApply}% off`;
      } else if (/groupBuy_setPrice/.test(promoType)) {
        let numPromoApply = +promoType.match(/\d+/g)[0];
        let totalPriceApply = +promoType.match(/\d+/g)[1];
        promoText = `Buy ${numPromoApply} for ${totalPriceApply}$`;
      }
    } else {
      promoText = "There is no promotion apply at the moment";
    }
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
        {promoText}
      </div>
    );
  }
}
ProductItem.propTypes = {
  value: PropTypes.number
};
