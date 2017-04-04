import React from 'react';
import './App.css';

class Button extends React.Component {

    handleClick = () => {
        this.props.onClickFunction(this.props.incrementValue);
    };

    render() {
        return (
            <button onClick={this.handleClick}>plus {this.props.incrementValue}</button>
        )
    }
}

Button.defaultProps = {
    incrementValue: 1
};

Button.propTypes = {
    onClickFunction: React.PropTypes.func.required,
    incrementValue: React.PropTypes.number
};

const Result = (props) => {
    return (
        <div>{props.data}</div>
    )
};

class ReusableComponent extends React.Component {
    state = {counter: 0};

    incrementCounter = (incrementValue) => {
        this.setState((prevState) => ({
            counter: prevState.counter + incrementValue
        }));
    };

    render() {
        return (
            <div className="App">
                <Button onClickFunction={this.incrementCounter} incrementValue={5}/>
                <Button onClickFunction={this.incrementCounter} incrementValue={10}/>
                <Button onClickFunction={this.incrementCounter} incrementValue={25}/>
                <Button onClickFunction={this.incrementCounter} incrementValue={50}/>
                <Result data={this.state.counter}/>
            </div>
        )
    }
}

export default ReusableComponent;