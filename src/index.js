import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import imageLoader from './images.js';

const images = imageLoader(require.context('./images/', false, /\.png$/));
console.log(images[0]);

function Buttons(props) {
  return(
    <div>
      <button className="buttonDown" onClick = {props.onClickDecrease}>
        Previous Image
      </button>
      <button className="buttonUp" onClick = {props.onClickIncrease}>
        Next Image
      </button>
    </div>
  );
}

class Counter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imagesLength: images.length - 5,
      currentTime: 0
    }
  }

  increase(){
    if (this.state.currentTime === 0) {
      this.setState({
        currentTime: 0
      })
    } else {
      this.setState({
        currentTime: this.state.currentTime - 5
      })
    }
  }

  decrease(){
    this.setState({
      currentTime: this.state.currentTime + 5
    });
  }

  render(){
    return(
      <div className="wrapper">
        <div className="main">
          <h2>Viewing {this.state.currentTime} Minutes Ago</h2>
        </div>
         <div className="button">
          <Buttons 
            onClickIncrease = {() => this.increase()}
            onClickDecrease = {() => this.decrease()}
          />
        </div>
      </div>
    );
  }
}

class Container extends React.Component {

  getBasename(path) {
    return path.split('/').reverse()[0];
  }

  render() {
    return(
      <div className="map">
        <img src={images[1]} alt="map" />
        <Counter />
      </div>
    )
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);