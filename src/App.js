import React from 'react';
import axios from 'axios';

const Card = (props) => {
  return (
    <div style={{ margin: '1em' }}>
      <img style={{ width: 75 }} src={props.avatar_url} alt={props.name} />
      <div>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
};

class Form extends React.Component {
  state = {
    userName: ""
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Event Invoked!", this.state.userName);
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        // console.log(resp.data);
        this.props.onSubmit(resp.data);
        this.setState({userName: ""});
      })
  };

  onchangeHandle = (event) => {
    this.setState({ userName: event.target.value });
  };

  render() {
    return (
      <form style={{ margin: '1em' }} onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.userName}
          onChange={this.onchangeHandle} palceholder='Github Username' required />
        <button type='submit'>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: [
      {
        id: 1,
        name: "Paul O’Shannessy",
        avatar_url: "https://avatars1.githubusercontent.com/u/8445?v=4",
        company: "Facebook"
      },
      {
        id: 2,
        name: "Ashish095",
        avatar_url: "https://avatars2.githubusercontent.com/u/24385554?v=4",
        company: "Bigger than Google"
      }
    ]
  };

  addCardInfo = (cardInfo) => {
    console.log(cardInfo);
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }))
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addCardInfo} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

export default App;
