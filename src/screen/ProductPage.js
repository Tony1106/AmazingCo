import React from "react";
import firebase from "firebase";
import ProductItem from "../component/ProductItem";
import CartItem from "../component/CartItem";
import styles from "./styles/ProductPage.module.css";
import { Button } from "semantic-ui-react";
export default class ProductPage extends React.Component {
  state = {
    products: [],
    cart: {}
  };
  componentDidMount() {
    console.log("GrandChild did mount.");
    const firestore = firebase.firestore();
    const productRef = firestore.collection("Products");
    productRef.get().then(res => {
      let products = [];
      res.forEach(res => {
        let data = res.data();
        data.id = res.id;
        products.push(data);
      });
      this.setState({ products });
      console.log(products);
    });
  }
  handleAddToCart(productAddToCart) {
    let { cart } = this.state;
    if (cart.hasOwnProperty(productAddToCart.id)) {
      cart[productAddToCart.id].quantity += productAddToCart.value;
    } else {
      cart[productAddToCart.id] = { quantity: productAddToCart.value };
    }

    this.setState({ cart });
  }
  handleUpdateCart() {
    let { cart } = this.state;
    console.log(cart);

    const firestore = firebase.firestore();
    const productRef = firestore.collection("Carts").doc("Cart");
    productRef.set(cart);
  }
  render() {
    let { products, cart } = this.state;
    console.log(cart);
    let productItem = products
      ? products.map((product, i) => (
          <ProductItem
            key={i}
            product={product}
            addToCart={this.handleAddToCart.bind(this)}
          />
        ))
      : null;
    return (
      <div className={styles.container}>
        {" "}
        <div className={styles.productContainer}>
          <h1>List Product Page</h1>
          <div className={styles.wrapItem}>{productItem}</div>
        </div>
        <div className={styles.cartContainer}>
          <h1>This is the cart</h1>
          <Button primary onClick={this.handleUpdateCart.bind(this)}>
            Update Cart
          </Button>
          <div className={styles.cartItemWrap}>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className={styles.totalWrap}>
            <div>
              Total <span>478$</span>
            </div>
            <div>
              Discount <span>200$</span>
            </div>
            <div>
              You pay <span>100$</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
