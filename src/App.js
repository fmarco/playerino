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
    this.stop = this.stop.bind(this);
    this.running = false;
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
    if(this.state.frameList != null && index != null){
        let new_index = (this.state.index + this.state.frameList.length - 1) % this.state.frameList.length;
        this.setState({index: new_index});
    }
  }

  goForward(){
    let index = this.state.index;
    if(this.state.frameList != null && index != null){
        let new_index = (this.state.index + 1) % this.state.frameList.length;
        this.setState({index: new_index});
    }
  }

  play(){
    let self = this;
    
    if(this.state.frameList != null){
        this.running = true;
        (function iterate () {
          setTimeout(function () {
            self.goForward();
            if (self.running) {
              iterate();
            }
          }, 1000);
        })();

     }
  }

  stop(){
    this.running = false;
  }

  render() {
    const currentFrame = this.state.frameList[this.state.index];
    return (
      <div className="App">
        <Editor width={this.state.width} height={this.state.height} play={this.play} stop={this.stop} addFrame={this.addFrame} currentFrame={currentFrame} goBack={this.goBack} goForward={this.goForward} />
      </div>
    );
  }
}

export default App;
