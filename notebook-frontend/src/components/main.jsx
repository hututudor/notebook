import React, { Component } from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default Main;
