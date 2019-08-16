import React, { Component } from 'react';

import SnakeUnit from './SnakeUnit';
import SnackUnit from './SnackUnit';
import EmptyUnit from './EmptyUnit';

import './Row.css';

class Row extends Component {
  render() {
    const { row } = this.props;

    const rowComponents = [];
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 'head' || row[i] === 'body' || row[i] === 'tail') {
        rowComponents.push(<SnakeUnit key={i} />);
      } else if (row[i] === 'snack') {
        rowComponents.push(<SnackUnit key={i} />);
      } else {
        rowComponents.push(<EmptyUnit key={i} />);
      }
    }
    return (
      <div className='Row'>
        { rowComponents }
      </div>
    );
  }
}

export default Row;