import React, { Component } from 'react';

import SnakeUnit from './SnakeUnit';
import LoadingUI from './LoadingUI';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeLength: 10,
      board: [],
      loading: true
    }
    let k = 0;
    while (k < 150) {
      this.state.board.push([... new Array(150).fill(null)]);
      k++;
    }
  }

  componentDidMount() {
    this.setState({...this.state, loading: false});
  }

  render() {
    const { snakeLength, loading, board } = this.state;
    if (loading) {
      return (
        <div className='Board'>
          <LoadingUI/>
        </div>
      );
    }
    
    let i = 0;
    const fullSnake = [];
    while (i < snakeLength) {
      fullSnake.push(<SnakeUnit key={i} />)
      i++;
    }

    return (
      <div className='Board'> 
        { fullSnake }
      </div>
    );
  }
}
