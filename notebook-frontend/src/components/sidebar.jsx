import React, { Component } from 'react';
import Item from './item';

class Sidebar extends Component {
  state = {
    items: [
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      },
      {
        title: 'Item 1',
        id: 1
      },
      {
        title: 'Item 2',
        id: 2
      }
    ]
  };

  render() {
    return (
      <div className="main_sidebar">
        {this.state.items.map(item => (
          <Item />
        ))}
      </div>
    );
  }
}

export default Sidebar;
