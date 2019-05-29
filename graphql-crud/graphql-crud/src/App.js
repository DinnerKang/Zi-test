import React, { Component, Fragment } from 'react';
import './App.css';

import ProductList from './components/ProductList';


class App extends Component {
  render() {
    return (
      <Fragment>
        <ProductList></ProductList>
      </Fragment>
    );
  }
}

export default App;
