import React, { Component } from "react";
import firebase from "firebase";
import styles from "./styles/AdminManagePromoStatus.module.css";
import { Image, Radio } from "semantic-ui-react";
export default class AdminManagePromoStatus extends Component {
  state = {
    products: []
  };
  componentDidMount() {
    const firestore = firebase.firestore();
    const productRef = firestore.collection("Products");
    var unsubscribe = productRef
      .onSnapshot(res => {
        let products = [];
        res.forEach(res => {
          let data = res.data();
          data.id = res.id;
          products.push(data);
        });
        this.setState({ products });
        console.log(products);
      })
      .catch(err => console.log(err));
  }
  componentWillUnmount() {
    unsubscribe();
  }
  render() {
    const { products } = this.state;
    let listItem = [];
    listItem = products
      ? products.map(item => (
          <ul key={item.id} className={styles.row}>
            <li>
              <Image src={item.image} size="small" />{" "}
            </li>
            <li>{item.event}</li>
            <li>
              {item.promoStatus ? (
                <>
                  <Radio toggle checked={true} />
                  <p style={{ color: "green" }}>Active</p>
                </>
              ) : (
                <Radio toggle />
              )}
            </li>
            <li>{item.promoText}</li>
          </ul>
        ))
      : null;
    return (
      <ul>
        <ul className={styles.row}>
          <li>Image</li>
          <li>Product</li>
          <li>Promo Status</li>
          <li>Promo Text</li>
        </ul>
        {listItem}
      </ul>
    );
  }
}
