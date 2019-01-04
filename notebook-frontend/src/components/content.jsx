import React, { Component } from 'react';
import Sidebar from './sidebar';
import Textbox from './textbox';

class Content extends Component {
  render() {
    return (
      <div className="main_content">
        <Sidebar />
        <Textbox />
      </div>
    );
  }
}

export default Content;
