import React, { Component } from 'react';

import LoadingUI from './LoadingUI';
import Row from './Row';

import './Board.css'


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeLength: 1,
      board: [],
      loading: true
    }
    let k = 0;
    let snackLocation = Math.floor(Math.random() * 30);
    if (snackLocation === 15) {
      snackLocation++;
    }
    while (k < 30) {
      if (k !== 15 && k !== snackLocation) {
        this.state.board.push([...new Array(30).fill(null)]);
      } else {
        let row;
        if (k === snackLocation) {
          let lengthLeft = snackLocation - 1;
          let lengthRight = 30 - snackLocation;
          const left = new Array(lengthLeft).fill(null);
          left.push('snack');
          row = left.concat(new Array(lengthRight).fill(null));
        } else {
          const left = new Array(14).fill(null);
          left.push('head');
          row = left.concat(new Array(15).fill(null));
        }
        this.state.board.push(row);
      }
      k++;
    }
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: false });
  }

  render() {
    const { loading, board } = this.state;
    if (loading) {
      return (
        <div className='Board'>
          <LoadingUI />
        </div>
      );
    }
    debugger
    let i = 0;
    let fullBoard = [];
    for (let row of board) {
      const currRow = <Row row={row} key={i} />;
      fullBoard.push(currRow);
      i++;
    }

    return (
      <div className='Board'>
        {fullBoard}
      </div>
    );
  }
}
