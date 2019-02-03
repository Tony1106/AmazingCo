import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Admin from "./screen/Admin";
import ProductPage from "./screen/ProductPage";
import AdminManagePromoStatus from "./screen/AdminManagePromoStatus";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/productpage" component={ProductPage} />
          <Route exact path="/admin" component={Admin} />
          <Route
            exact
            path="/admin/promoStatus"
            component={AdminManagePromoStatus}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
