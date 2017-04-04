import React from 'react';
import axios from 'axios';
import './App.css';

const Card = (props) => {
    return (
        <div style={{marginTop: '1em', borderBottom: '1px solid black'}}>
            <img width={100} src={props.avatar_url}/>
            <div style={{display: 'inline-block', marginLeft: '10px'}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.data.map(card =>
                <Card key={card.name} {...card}/>
            )}
        </div>
    )
};

class Form extends React.Component {

    state = {userName: ''};

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.inputText.value);
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                this.props.onSubmitFunction(resp.data);
                this.setState({userName: ''});
            });
    };

    handleInput = (event) => {
        this.setState({
            userName: event.target.value
        })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    /* use ref to get input value
                     ref={(input) => this.inputText = input}
                     */
                       value={this.state.userName}
                       onChange={this.handleInput}
                       placeholder="input username here..."
                       required/>
                <button type="submit">submit</button>
            </form>
        )
    }
}

class App extends React.Component {
    state = {
        cards: []
    };

    addNewCard = (newCard) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(newCard)
        }));
    };

    render() {
        return (
            <div className="App">
                <Form onSubmitFunction={this.addNewCard}/>
                <CardList data={this.state.cards}/>
            </div>
        )
    }
}

export default App;