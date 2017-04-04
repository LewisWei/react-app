import React from 'react';

// function Component
function Button(props) {
    return (
        <button>{props.label}</button>
    )
}


// es6 function Component
const Button = (props) => {
    return (
        <button>{props.label}</button>
    )
};


// class Component
class Button extends React.Component {
    render() {
        return (
            <button>{this.props.label}</button>
        )
    }
}

Button.propTypes = {
    label: React.PropTypes.string.required  // mark as required
};

// class Component with state
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0}
    }

    handleClick() {
        this.setState({counter: this.state.counter + 1})
    }

    render() {
        return (
            <button onClick={this.handleClick.bind(this)}>
                {this.state.counter}</button>
        )
    }
}


// advanced by Babel
class Button extends React.Component {
    state = {counter: 0};

    handleClick = () => {
        this.setState({counter: this.state.counter + 1})
    };

    render() {
        return (
            <button onClick={this.handleClick}>{this.state.counter}</button>
        )
    }
}


/* improve setState */
class Button extends React.Component {
    state = {counter: 0};

    handleClick = () => {
        // React State is sequential
        this.setState(prevState => ({counter: prevState.counter + 1}))
    };

    render() {
        return (
            <button onClick={this.handleClick}>{this.state.counter}</button>
        )
    }
}

export default Button