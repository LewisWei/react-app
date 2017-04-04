import React from 'react';
import './App.css';
import _ from 'lodash';

const Stars = () => {
    const numberOfStars = _.random(1, 10);

    return (
        <div className="col-5">
            {_.range(numberOfStars).map((d, i) =>
                <i key={i} className="fa fa-star"/>
            )}
        </div>
    )
};

const Button = () => {
    return (
        <div className="col-2">
            <button>=</button>
        </div>
    )
};

const Answer = () => {
    return (
        <div className="col-5">
            <span>5</span>
            <span>6</span>
        </div>
    )
};

const Numbers = () => {
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((d, i) =>
                    <span key={i}>{d}</span>
                )}
            </div>
        </div>
    )
};

Numbers.list = _.range(1, 10);

class Game extends React.Component {
    render() {
        return (
            <div>
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars/>
                    <Button/>
                    <Answer/>
                </div>
                <br/>
                <Numbers/>
            </div>
        )
    }
}

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Game/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;