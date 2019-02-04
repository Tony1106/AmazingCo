import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Admin from "./screen/Admin/Admin";
import ProductPage from "./screen/ProductPage/ProductPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/productpage" component={ProductPage} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </div>
    );
  }
}

export default App;
