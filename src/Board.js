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
      snackCoords: [],
      direction: 'right',
      board: null,
      intervalID: null,
    }

    this.endGame = this.endGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.moveUnitUp = this.moveUnitUp.bind(this);
    this.moveUnitDown = this.moveUnitDown.bind(this);
    this.moveUnitLeft = this.moveUnitLeft.bind(this);
    this.moveUnitRight = this.moveUnitRight.bind(this);
    this.updateSnakeCoords = this.updateSnakeCoords.bind(this);
    this.changeSnakeDirection = this.changeSnakeDirection.bind(this);
  }

  createBoard() {
    const board = []

    const snakeLocation = Math.ceil(Math.random() * 30);

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
    return [board, [snakeLocation, snakeLocation], [snackLocation, snackLocation]];
  }

  updateSnakeCoords(x, y) {
    this.setState({ ...this.state, snakeCoords: [x, y] });
  }

  componentDidMount() {
    const newGame = this.createBoard();
    const intervalID = setInterval(this.moveSnake, 4000);
    this.setState({
      ...this.state,
      board: newGame[0],
      snakeCoords: [newGame[1]],
      snackCoords: newGame[2],
      loading: false,
      intervalID,
    });
  }

  endGame() {
    clearInterval(this.state.intervalID);
  }


  /**
   * TODO: THINGS TO KEEP TRACK OF:
   * - THE SNACK
   * - UPDATED SNAKELENGTH IF YOU REACH IT
   * - EVERY SNAKE COORD 
   * - shouldn't be able to do a 180
   * - UPDATES ON DIRECTION BASED OFF OF USER INPUT 
   */
  moveSnake() {
    const { direction, snakeCoords, board, snakeLength } = this.state;

    let newBoard = board.map(r => r.slice());

    let currSnakeUnitX = snakeCoords[0][0];
    let currSnakeUnitY = snakeCoords[0][1];
    let currDirection = direction;
    let i = 0;
    while (i < snakeLength) {
      if (currDirection === 'right') {

        newBoard = this.moveUnitRight(
          newBoard,
          currSnakeUnitX + 1,
          currSnakeUnitY);

        currSnakeUnitX--;

      } else if (currDirection === 'left') {
        newBoard = this.moveUnitLeft(
          newBoard,
          currSnakeUnitX - 1,
          currSnakeUnitY)
        currSnakeUnitX++;
      } else if (currDirection === 'up') {
        newBoard = this.moveUnitUp(
          newBoard,
          currSnakeUnitX,
          currSnakeUnitY + 1)
        currSnakeUnitY--;
      } else if (currDirection === 'down') {
        newBoard = this.moveUnitDown(
          newBoard,
          currSnakeUnitX,
          currSnakeUnitY - 1)
        currSnakeUnitY++;
      }
      i++;
    }

    this.setState(state =>({
      ...state,
      board: newBoard,
    }));
  }

  isValid(board, x, y) {
    return (
      x > 0
      && x <= 30
      && y > 0
      && y <= 30
      && board[x][y] === null); //TODO: WHAT ABOUT SNACKS? 
  }

  moveUnitRight(board, x, y) {
    if (this.isValid(board, x, y)) {
      // console.log(`MOVEUNITRIGHT RAN`, board);
      [board[x][y], board[x - 1][y]]
        = [board[x - 1][y], null];
      return board;
    } else {
      this.endGame();
    }
  }
  moveUnitLeft(board, x, y) {
    if (this.isValid(board, x, y)) {
      [board[x][y], board[x + 1][y]]
        = [board[x + 1][y], null];
      return board;
    } else {
      this.endGame();
    }
  }
  moveUnitUp(board, x, y) {
    if (this.isValid(board, x, y)) {
      [board[x][y], board[x][y - 1]]
        = [board[x][y - 1], null];
      return board;
    } else {
      this.endGame();
    }
  }
  moveUnitDown(board, x, y) {
    if (this.isValid(board, x, y)) {
      [board[x][y], board[x][y + 1]]
        = [board[x][y + 1], null];
      return board;
    } else {
      this.endGame();
    }
  }

  changeSnakeDirection(e) {
    e.preventDefault();

    const keyPressed = e.keyCode;
    let { direction } = this.state;

    if (keyPressed === 37 && direction !== 'left') {
      direction = 'right';
    } else if (keyPressed === 38 && direction !== 'up') {
      direction = 'down';
    } else if (keyPressed === 39 && direction !== 'right') {
      direction = 'left';
    } else if (keyPressed === 40 && direction !== 'down') {
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
