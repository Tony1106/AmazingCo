import React, { Component } from "react";
import {
  Container,
  Header,
  Dropdown,
  Divider,
  Button
} from "semantic-ui-react";
import TimeInput from "../../component/TimeInput";
import CheckBox from "../../component/CheckBox";
import PromoInput from "../../component/PromoInput";
import styles from "./Admin.module.css";
import moment from "moment";
import firebase from "firebase";
export default class Admin extends Component {
  state = {
    promoTypeValue: 0,
    error: {},
    formIsVaild: true,
    x: 0,
    y: 0,
    promoStart: "",
    promoEnd: "",
    products: [],
    productApplyPromo: {},
    promoName: ""
  };
  componentDidMount() {
    const firestore = firebase.firestore();
    const productRef = firestore.collection("Products");
    productRef
      .get()
      .then(res => {
        let products = [];
        res.forEach(res => {
          let data = res.data();
          data.id = res.id;
          products.push(data);
        });
        this.setState({ products });
      })
      .catch(err => console.log(err));
  }
  handleTimeStart = time => {
    this.setState({ promoStart: time });
  };
  handleTimeEnd = time => {
    this.setState({ promoEnd: time });
  };
  handleChangeX = x => {
    this.setState({ x });
  };
  handleChangeY = y => {
    this.setState({ y });
  };
  handlePromoType = (e, data) => {
    this.setState({ promoTypeValue: data.value, x: 0, y: 0 });
  };
  handleValidation = () => {
    let formIsVaild = true;
    let {
      promoTypeValue,
      x,
      y,
      promoStart,
      promoEnd,
      productApplyPromo
    } = this.state;
    let error = {};

    //Promo type
    if (promoTypeValue === 0) {
      formIsVaild = false;
      error["promoType"] = "Please choose one type of promotion";
    }
    //Input is require
    if (
      (promoTypeValue === 1 && x === 0) ||
      (promoTypeValue === 2 && x === 0)
    ) {
      formIsVaild = false;
      error["promoTypeWithRequireX"] = "Please input the value";
    }
    //Input is require
    if (
      (promoTypeValue === 3 && x === 0) ||
      (promoTypeValue === 4 && x === 0)
    ) {
      formIsVaild = false;
      error["promoTypeWithRequireX"] = "Please input the value";
    }
    //Input is require
    if (
      (promoTypeValue === 3 && y === 0) ||
      (promoTypeValue === 4 && y === 0)
    ) {
      formIsVaild = false;
      error["promoTypeWithRequireY"] = "Please input the value";
    }
    //Choose product
    if (Object.values(productApplyPromo).length == 0) {
      formIsVaild = false;
      error["chooseProduct"] = "Please choose at least one product";
    }
    //Time Start
    if (!promoStart) {
      formIsVaild = false;
      error["promoStart"] = "Please input the promotion time start";
    }
    //Time End
    if (!promoEnd) {
      formIsVaild = false;
      error["promoEnd"] = "Please input the promotion time end";
    }
    //Validate time end
    if (!moment(promoStart).isBefore(promoEnd)) {
      formIsVaild = false;
      error["timeValid"] = "Please input the time end is after time start";
    }

    this.setState({ error, formIsVaild });
    return formIsVaild;
  };
  handleCancel() {
    window.location.reload();
  }
  handleAddProduct(value) {
    let { productApplyPromo } = this.state;
    productApplyPromo[value] = {
      promoStatus: true
    };
    this.setState({ productApplyPromo });
  }
  handleRemoveProduct(value) {
    let { productApplyPromo } = this.state;
    delete productApplyPromo[value];
    this.setState({ productApplyPromo });
  }
  handleSubmit = e => {
    e.preventDefault();
    let formIsVaild = this.handleValidation();

    if (formIsVaild) {
      let {
        promoTypeValue,
        x,
        y,
        promoStart,
        promoEnd,
        productApplyPromo
      } = this.state;
      let promoType = "";
      let promoText = "";
      let promoStatus = true;
      switch (promoTypeValue) {
        case 1:
          promoType = "directDiscount_" + x;
          promoText = "Get discount " + x + " % for each product";
          break;
        case 2:
          promoType = "groupBuy_getFree_" + x;
          promoText = "Buy " + x + " get one free";
          break;
        case 3:
          promoType = "groupBuy_offPrice_" + x + "+" + y;
          promoText = `Buy ${x} get the next one off ${y}%`;
          break;
        case 4:
          promoType = "groupBuy_setPrice_" + x + "+" + y;
          promoText = `Buy ${x} for ${y}$`;
          break;
        case 5:
          promoType = "No promotion at the moment";
          promoText = `No promotion at the moment`;
          promoStatus = false;
          break;
        default:
          break;
      }
      for (let key in productApplyPromo) {
        productApplyPromo[key].promoType = promoType;
        firebase
          .firestore()
          .collection("Products")
          .doc(key)
          .update({
            promoType,
            promoStatus,
            promoEnd,
            promoStart,
            promoText
          })
          .then(() => {
            alert("Update Finish");
            window.location.reload();
          })
          .catch(err => console.log(err));
      }
    } else {
      console.log("Form is not validate");
    }
  };

  render() {
    let { promoTypeValue, error, products } = this.state;
    let promoType = [
      { key: "directDiscount_X", value: 1, text: "Take Percent Off" },
      { key: "groupBuy_getFree_X", value: 2, text: "Buy X get one Free" },
      {
        key: "groupBuy_offPrice_X+Y",
        value: 3,
        text: "Buy X get the (X+1) Y Off"
      },
      { key: "groupBuy_setPrice_X+Y", value: 4, text: "Combo: Buy X for Y$" },
      { key: "removePromo", value: 5, text: "Remove Promotion" }
    ];
    let productChoice = products
      ? products.map(item => (
          <CheckBox
            key={item.id}
            data={item}
            addProductApplyPromo={value => this.handleAddProduct(value)}
            removeProductApplyPromo={value => this.handleRemoveProduct(value)}
          />
        ))
      : null;

    return (
      <Container>
        <Header as="h3" block>
          Promotion time
        </Header>
        <div className={styles.promoTime}>
          <div>
            <p>Type in your promotion time start</p>
            <TimeInput datePick={time => this.handleTimeStart(time)} />
            {error.promoStart ? (
              <p style={{ color: "red" }}>{error.promoStart}</p>
            ) : null}
          </div>
          <div>
            <p>Type in your promotion time end</p>
            <TimeInput datePick={time => this.handleTimeEnd(time)} />
            {error.promoEnd ? (
              <p style={{ color: "red" }}>{error.promoEnd}</p>
            ) : null}
            {error.timeValid ? (
              <p style={{ color: "red" }}>{error.timeValid}</p>
            ) : null}
          </div>
        </div>

        <Header as="h3" block>
          Discount
        </Header>
        <div>
          <div>
            <p>Discount Type</p>
            <Dropdown
              placeholder="Choose your discount type"
              search
              selection
              options={promoType}
              onChange={(e, data) => this.handlePromoType(e, data)}
            />
            {error.promoType ? (
              <p style={{ color: "red" }}>{error.promoType}</p>
            ) : null}
          </div>
          <Divider />
          <div>
            <p>Choose the product you want to apply the product for</p>
            <div className={styles.checkbox}>{productChoice}</div>
            {error.chooseProduct ? (
              <p style={{ color: "red" }}>{error.chooseProduct}</p>
            ) : null}
          </div>
          <Divider />
          <div>
            <PromoInput
              promoTypeValue={promoTypeValue}
              x={x => this.handleChangeX(x)}
              y={y => this.handleChangeY(y)}
              error={error}
            />
          </div>
        </div>
        <Button.Group>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button.Or />
          <Button positive onClick={this.handleSubmit}>
            Save
          </Button>
        </Button.Group>
      </Container>
    );
  }
}
