import React from 'react';
import './App.css';
import _ from 'lodash';

const possibleCombinationSum = (arr, n) => {
    // easiest case: n is in the array somewhere
    if (arr.indexOf(n) >= 0) {
        return true;
    }
    // if the smallest element is > n, no solution, so finish
    if (arr[0] > n) {
        return false;
    }
    // get rid of any elements larger than n, recursively
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }

    let listSize = arr.length, combinationsCount = (1 << listSize);
    for (let i = 1; i < combinationsCount; i++) {
        let combinationSum = 0;
        for (let j = 0; j < listSize; j++) {
            if (i & (1 << j)) {
                combinationSum += arr[j];
            }
        }
        if (n === combinationSum) {
            return true;
        }
    }
    return false;
};

const Stars = (props) => {
    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map((d, i) =>
                <i key={i} className="fa fa-star"/>
            )}
        </div>
    )
};

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button className="btn btn-success" onClick={props.acceptAnswer}>
                <i className="fa fa-check"/>
            </button>;
            break;
        case false:
            button = <button className="btn btn-danger">
                <i className="fa fa-times"/>
            </button>;
            break;
        default:
            button = <button className="btn"
                             disabled={props.selectedNumbers.length === 0}
                             onClick={props.checkAnswer}>=</button>;
            break;
    }
    return (
        <div className="col-2 text-center">
            {button}
            <br/>
            <br/>
            <button className="btn btn-sm btn-warning" onClick={props.redraw} disabled={props.redraws === 0}>
                <i className="fa fa-refresh"></i>{props.redraws}
            </button>
        </div>
    )
};

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number, i) =>
                <span key={i}
                      onClick={() => props.unSelectNumber(number)}
                >{number}</span>
            )}
        </div>
    )
};

const Numbers = (props) => {

    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span key={i}
                          className={numberClassName(number)}
                          onClick={() => props.selectNumber(number)}
                    >{number}</span>
                )}
            </div>
        </div>
    )
};

Numbers.list = _.range(1, 10);

const DownFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={() => props.resetGame()}>Play Again</button>
        </div>
    )
};

class Game extends React.Component {

    static randomNumber = () => {
        return _.random(1, 10);
    };

    static initialState = () => {
        return {
            selectedNumbers: [],
            usedNumbers: [],
            numberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            redraws: 5,
            doneStatus: null
        }
    };

    state = Game.initialState();

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }
        if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect: null
        }))
    };

    unSelectNumber = (clickedNumber) => {
        this.setState((prevState) => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            answerIsCorrect: null
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: this.state.selectedNumbers.reduce((acc, n) => acc + n, 0) === this.state.numberOfStars
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: Game.randomNumber()
        }), this.updateDoneStatus);
    };

    redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState(prevState => ({
            numberOfStars: Game.randomNumber(),
            selectedNumbers: [],
            answerIsCorrect: null,
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus);
    };

    hasPossibleAnswer = ({usedNumbers, numberOfStars}) => {
        let unUsedNumbers = _.range(1, 10).filter(d => usedNumbers.indexOf(d) === -1);
        return possibleCombinationSum(unUsedNumbers, numberOfStars);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return ({doneStatus: 'Done.Nice~'});
            }
            if (prevState.redraws === -1 && !this.hasPossibleAnswer(prevState)) {
                return ({doneStatus: 'Game Over!'})
            }
        })
    };

    resetGame = () => this.setState(Game.initialState());

    render() {
        const {numberOfStars, selectedNumbers, answerIsCorrect, usedNumbers, redraws, doneStatus}=this.state;

        return (
            <div>
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}
                            answerIsCorrect={answerIsCorrect}
                            checkAnswer={this.checkAnswer}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={redraws}
                    />
                    <Answer selectedNumbers={selectedNumbers}
                            unSelectNumber={this.unSelectNumber}/>
                </div>
                <br/>
                {doneStatus ?
                    <DownFrame resetGame={this.resetGame} doneStatus={doneStatus}/>
                    :
                    <Numbers selectedNumbers={selectedNumbers}
                             usedNumbers={usedNumbers}
                             selectNumber={this.selectNumber}/>
                }
            </div>
        )
    }
}

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <div className="container">
                    <Game/>
                </div>
            </div>
        )
    }
}

export default App;