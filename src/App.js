import React, { Component } from 'react';
import './App.css';

import Editor from './components/Editor';



class App extends Component {

  constructor(props){
    super(props);
    this.addFrame = this.addFrame.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.play = this.play.bind(this);
    this.state = { width: 600, height: 700, frameList: [], index: null };
  }

  addFrame(data){
    let frames = this.state.frameList;
    let index = this.state.index;
    frames.push(data);
    this.setState({frameList: frames});
    this.setState({index: frames.length - 1});
  }

  goBack(){
    let index = this.state.index;
    if(this.state.frameList != null){
      if(index > 0)
        this.setState({index: this.state.index - 1});
    }
  }

  goForward(){
    let index = this.state.index;
    if(this.state.frameList != null){
      if(index < this.state.frameList.length && index >= 0)
        this.setState({index: this.state.index + 1});
    }
  }

  play(){
    let self = this;
    if(this.state.frameList != null){

        (function iterate (i) {
          setTimeout(function () {
            self.goForward();
            if (--i) {
              iterate(i);
            }
          }, 1000);
        })(this.state.frameList.length - 1);

     }
  }

  render() {
    const currentFrame = this.state.frameList[this.state.index];
    return (
      <div className="App">
        <Editor width={this.state.width} height={this.state.height} play={this.play} addFrame={this.addFrame} currentFrame={currentFrame} goBack={this.goBack} goForward={this.goForward} />
      </div>
    );
  }
}

export default App;
