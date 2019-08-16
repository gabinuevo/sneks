import React, { Component } from 'react';

import LoadingUI from './LoadingUI';
import Row from './Row';

import './Board.css'


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeLength: 1,
      loading: true,
      direction: 'right',
      board: [],
    }

    let snackLocation = Math.floor(Math.random() * 30);
    // if the snack is located at the head of snake
    snackLocation === 15 && snackLocation++;

    for (let k = 0; k < 30; k++) {
      if (k !== 15 && k !== snackLocation) {
        this.state.board.push([...new Array(30).fill(null)]);
      } else {
        let row;
        if (k === snackLocation) {
          const left = new Array((snackLocation - 1)).fill(null);
          left.push('snack');
          row = left.concat(new Array((30 - snackLocation)).fill(null));
        } else {
          const left = new Array(14).fill(null);
          left.push('head');
          row = left.concat(new Array(15).fill(null));
        }
        this.state.board.push(row);
      }
    }
    this.autoMoveSnake = this.autoMoveSnake.bind(this);
    this.manuallyMoveSnake = this.manuallyMoveSnake.bind(this);
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: false });
  }

  autoMoveSnake() {

  }

  manuallyMoveSnake() {

  }

  render() {
    const { loading, board } = this.state;

    let i = 0;
    let fullBoard = [];
    for (let row of board) {
      const currRow = <Row row={row} key={i} />;
      fullBoard.push(currRow); i++;
    }

    return (
      <div className='Board'>
        {loading ? <LoadingUI /> : fullBoard}
      </div>
    );
  }
}
