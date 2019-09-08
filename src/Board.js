import React, { Component } from 'react';

import LoadingUI from './LoadingUI';
import Row from './Row';

import './Board.css'


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      snakeLength: 1,
      snakeCoords: [], // x and y
      direction: 'right',
      board: null,
      intervalID: null,
    }

    this.endGame = this.endGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.updateSnakeCoords = this.updateSnakeCoords.bind(this);
    this.changeSnakeDirection = this.changeSnakeDirection.bind(this);
  }

  createBoard() {
    const board = []

    const snakeLocation = Math.floor(Math.random() * 30);

    let snackLocation = Math.floor(Math.random() * 30);
    // if the snack is located at the head of snake, move the snack
    snackLocation === snakeLocation && snackLocation++;

    for (let k = 0; k < 30; k++) {
      if (k !== snakeLocation && k !== snackLocation) {
        board.push([...new Array(30).fill(null)]);
      } else {
        let row;
        if (k === snackLocation) {
          const left = new Array((snackLocation - 1)).fill(null);
          left.push('snack');
          row = left.concat(new Array((30 - snackLocation)).fill(null));
        } else {
          const left = new Array((snakeLocation - 1)).fill(null);
          left.push('head');
          row = left.concat(new Array((30 - snakeLocation)).fill(null));
        }
        board.push(row);
      }
    }
    return [board, [snakeLocation, snakeLocation]];
  }

  updateSnakeCoords(x, y) {
    this.setState({ ...this.state, snakeCoords: [x, y] });
  }

  componentDidMount() {
    const intervalID = setInterval(this.moveSnake, 1000);
    const newGame = this.createBoard();
    this.setState({
      ...this.state,
      board: newGame[0],
      snakeCoords: newGame[1],
      loading: false,
      intervalID,
    });
  }

  endGame() {
    clearInterval(this.state.intervalID);
  }

  moveSnake() {
    const { direction, snakeCoords, board, snakeLength } = this.state;

    const newBoard = board.map(r => r.slice());

    const currSnakeUnitX = snakeCoords[0];
    const currSnakeUnitY = snakeCoords[1];

    let i = 0;
    while (i < snakeLength) {
      if (i === 0) {
        if (direction === 'right') {
          let placeholder = board[currSnakeUnitX][currSnakeUnitY];
          newBoard[currSnakeUnitX + 1][currSnakeUnitY] = placeholder;
          newBoard[currSnakeUnitX][currSnakeUnitY] = null;
        }
      } else {

      }
      
      i++;
    }
  }

  changeSnakeDirection(e) {
    e.preventDefault();
    const keyPressed = e.keyCode;
    let direction;
    if (keyPressed === 37) {
      direction = 'right';
    } else if (keyPressed === 38) {
      direction = 'down';
    } else if (keyPressed === 39) {
      direction = 'left';
    } else if (keyPressed === 40) {
      direction = 'up';
    }
    this.setState({ ...this.state, direction });
  }

  render() {
    const { loading, board } = this.state;

    let i = 0;
    let fullBoard = [];
    if (!loading) {
      for (let row of board) {
        const currRow = <Row row={row} key={i} />;
        fullBoard.push(currRow); i++;
      }
    }

    return (
      <div className='Board'>
        {loading ? <LoadingUI /> : fullBoard}
      </div>
    );
  }
}
