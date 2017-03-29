import React, { Component } from 'react';

export default class Editor extends Component {

    constructor(props){
        super(props);
        this.handleMouseUpdate = this.handleMouseUpdate.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.saveCanvas = this.saveCanvas.bind(this);
        this.down = false;
    }

    getContext(){
        return this.refs.canvas.getContext('2d');
    }

    setCanvas(data){
        const ctx = this.getContext();
        ctx.putImageData(data, 0, 0);
    }

    saveCanvas(e){
        e.preventDefault();
        const ctx = this.getContext();
        let data = ctx.getImageData(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        this.props.addFrame(data);
        this.clearCanvas(e);
    }

    clearCanvas(e){
        e.preventDefault();
        const ctx = this.getContext();
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    }

    handleMouseUpdate(e){
        e.preventDefault();
        this.down = true;
        const ctx = this.getContext();
        var pos = this.getMouseCoord(this.canvas, e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        let obj = ctx.getImageData(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    }

    handleMouseUp(e){
        e.preventDefault();
        this.down = false;
    }

    handleMouseMove(e){
        e.preventDefault();
        if(this.down)
            this.draw(e); 
    }

    draw(e) {
        var pos = this.getMouseCoord(this.canvas, e);
        const ctx = this.getContext();
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    getMouseCoord(canvas, evt) {
        var rect = this.refs.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    componentWillReceiveProps(props){
        this.setCanvas(props.currentFrame);
    }

    render() {
        return (
            <div>
                <canvas style={{ border: '1px solid black' }} ref="canvas" width={this.props.width} height={this.props.height} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseUpdate} />
                <button onClick={this.clearCanvas}>Clear</button>
                <button onClick={this.saveCanvas}>Save</button>
                <button onClick={this.props.goBack}>Left</button>
                <button onClick={this.props.goForward}>Right</button>
                <button onClick={this.props.play}>Play</button>
                <button onClick={this.props.stop}>Stop</button>
            </div>
        );
    }
}
