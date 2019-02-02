import React from "react";
import firebase from "firebase";
import ProductItem from "../component/ProductItem";
import CartItem from "../component/CartItem";
import SaleSummary from "../component/SaleSummary";
import styles from "./styles/ProductPage.module.css";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
export default class ProductPage extends React.Component {
  state = {
    products: [],
    cart: {},
    applyPromoData: {},
    isUpdateCart: false
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
    let {
      id,
      description,
      event,
      price,
      image,
      value,
      promoStatus,
      promoType
    } = productAddToCart;

    let quantity = 0;
    if (cart.hasOwnProperty(id)) {
      quantity = +cart[id].quantity + +value;
    } else {
      quantity = +value;
    }
    cart[id] = {
      description,
      event,
      price,
      image,
      quantity,
      promoStatus,
      promoType
    };

    this.setState({ cart });
  }
  handleUpdateCart() {
    let { cart } = this.state;

    let jsonCart = JSON.stringify(cart);
    console.log(jsonCart);
    const firestore = firebase.firestore();
    const productRef = firestore
      .collection("Carts")
      .doc("CartDetailFromClient");
    let getDiscountPrice = firebase
      .functions()
      .httpsCallable("getDiscountPrice");
    getDiscountPrice(cart)
      .then(res =>
        this.setState({ applyPromoData: res.data.cart, isUpdateCart: true })
      )
      .catch(err => console.log(err));
    productRef.set(cart);
  }
  render() {
    let { products, cart, applyPromoData } = this.state;
    console.log(cart);
    let cartItem = [];
    let productItem = products
      ? products.map((product, i) => (
          <ProductItem
            key={i}
            product={product}
            addToCart={this.handleAddToCart.bind(this)}
          />
        ))
      : null;
    for (let key in applyPromoData) {
      cartItem.push(
        <CartItem key={key} applyPromoData={applyPromoData[key]} />
      );
    }
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
            <div className={styles.cartHeader}>
              <div />
              <div>Event</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
              <div>Total After Apply Promotion</div>
            </div>
            {cartItem}
          </div>
          <div className={styles.totalWrap}>
            {this.state.isUpdateCart ? (
              <SaleSummary data={applyPromoData} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ProductPage.propTypes = {
  productAddToCart: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    event: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    value: PropTypes.number,
    promoStatus: PropTypes.boolean,
    promoType: PropTypes.string
  })
};
