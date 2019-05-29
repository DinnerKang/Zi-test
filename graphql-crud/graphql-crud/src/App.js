import React, { Component, Fragment } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';

import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
        productId : {}
    }
}

  getInfo = (id) =>{
    this.setState({
      productId : id
    });
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Route render={ (props) => <ProductList {...props} passId={this.getInfo}></ProductList> } exact path="/"/>
          <Route render={ (props) => <ProductDetail {...props} productId={this.state.productId}></ProductDetail> } exact path="/ProductDetail"/>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
