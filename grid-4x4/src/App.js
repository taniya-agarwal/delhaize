import React, { Component } from 'react';
import './App.css';

const numberOfGrid = 16;
class App extends Component {
    constructor() {
        super();
        this.state = {
            focusedState: 0,
            gridArray: new Array(numberOfGrid).fill(undefined)
        }
    }

    move(event, index) {
        switch (event.keyCode) {
            case 37://left arrow
                let previousActiveTab = this.state.focusedState - 1
                if (this.state.focusedState === 0) {
                    previousActiveTab = numberOfGrid - 1;
                }
                this.setState({ focusedState: previousActiveTab });
                break
            case 38://up arrow
                let upperActiveTab = this.state.focusedState - 4
                if (upperActiveTab < 0) {
                    upperActiveTab = upperActiveTab + numberOfGrid;
                }
                this.setState({ focusedState: upperActiveTab });
                break
            case 39: //right
                let nextActiveTab = this.state.focusedState + 1
                if (this.state.focusedState === numberOfGrid - 1) {
                    nextActiveTab = 0;
                }
                this.setState({ focusedState: nextActiveTab });
                break
            case 40: //down
                let belowActiveTab = this.state.focusedState + 4
                if (belowActiveTab >= numberOfGrid - 1) {
                    belowActiveTab = belowActiveTab % numberOfGrid;
                }
                this.setState({ focusedState: belowActiveTab });
                break
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.gridArray}
                    {new Array(numberOfGrid).fill(undefined).map((item, index) => {
                        return <input key={index} className={this.state.focusedState === index ? 'gridBox focused' : 'gridBox'} autoFocus readOnly onKeyDown={(e) => this.move(e)} value={index+1} ></input>
                    })}
                </div>
            </div>
        );
    }
}

export default App;