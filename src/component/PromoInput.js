import React, { Component } from "react";
export default class PromoInput extends Component {
  state = {
    x: 0,
    y: 0
  };
  handleChangeX = e => {
    console.log(+e.target.value, "value");
    let x = +e.target.value;
    this.props.x(x);
    this.setState({ x });
  };
  handleChangeY = e => {
    console.log(+e.target.value, "value");
    let y = +e.target.value;
    this.props.y(y);
    this.setState({ y });
  };
  render() {
    let { promoTypeValue, error } = this.props;
    let { x, y } = this.state;
    let promoInput;
    if (promoTypeValue === 1) {
      promoInput = (
        <div>
          <p style={{ color: "red" }}>Take Percent Off</p>
          <p>Input your percent off for product</p>
          <input type="number" value={x} onChange={this.handleChangeX} />
          <span>%</span>
          {error.promoTypeWithRequireX ? (
            <p style={{ color: "red" }}>{error.promoTypeWithRequireX}</p>
          ) : null}
        </div>
      );
    } else if (promoTypeValue === 2) {
      promoInput = (
        <div>
          <p style={{ color: "red" }}>Buy X get one Free</p>
          <p>Input the number of product to get the next one free</p>
          <input type="number" value={x} onChange={this.handleChangeX} />
          {error.promoTypeWithRequireX ? (
            <p style={{ color: "red" }}>{error.promoTypeWithRequireX}</p>
          ) : null}
        </div>
      );
    } else if (promoTypeValue === 3) {
      promoInput = (
        <div>
          <p style={{ color: "red" }}>Buy X get the (X+1) Y Off</p>
          <p>Input the number of product to get the next one off Price</p>
          <input type="number" value={x} onChange={this.handleChangeX} />
          {error.promoTypeWithRequireX ? (
            <p style={{ color: "red" }}>{error.promoTypeWithRequireX}</p>
          ) : null}
          <p>Input the percent off the (X+1) </p>
          <input type="number" value={y} onChange={this.handleChangeY} />
          <span>%</span>
          {error.promoTypeWithRequireY ? (
            <p style={{ color: "red" }}>{error.promoTypeWithRequireY}</p>
          ) : null}
        </div>
      );
    } else if (promoTypeValue === 4) {
      promoInput = (
        <div>
          <p style={{ color: "red" }}>Combo: Buy X for Y$</p>
          <p>Input the number of product to get bundle price</p>
          <input type="number" value={x} onChange={this.handleChangeX} />
          {error.promoTypeWithRequireX ? (
            <p style={{ color: "red" }}>{error.promoTypeWithRequireX}</p>
          ) : null}
          <p>Input the price for the bundle </p>
          <input type="number" value={y} onChange={this.handleChangeY} />
          <span>$</span>
          {error.promoTypeWithRequireY ? (
            <p style={{ color: "red" }}>{error.promoTypeWithRequireY}</p>
          ) : null}
        </div>
      );
    }
    return <div>{promoInput}</div>;
  }
}
