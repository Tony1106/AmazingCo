import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import styles from "./styles/Admin.module.css";
export default class Admin extends Component {
  render() {
    return (
      <Container>
        <Header as="h3" block>
          Name
        </Header>
        <div>
          <p>Type in your promotion name</p>
          <input type="text" />
        </div>
        <Header as="h3" block>
          Promotion time
        </Header>
        <div className={styles.promoTime}>
          <input type="date" />
        </div>
        <Header as="h3" block>
          Discount
        </Header>
      </Container>
    );
  }
}
