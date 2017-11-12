import React from 'react';
import fetch from './../services/fetch';

export default class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Welcome',
      name: 'Guest',
      input: '',
    };
  }

  componentDidMount() {
    fetch('/user')
      .then(res => res.text())
      .then(name => this.setState({
        name,
      }));
  }

  updateInput(event) {
    this.setState({
      input: event.target.value,
    });
  }

  login(event) {
    event.preventDefault();
    const name = this.state.input;

    this.setState({
      name,
    });

    fetch('/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify({
        name,
      }),
    });
  }

  logout(event) {
    event.preventDefault();
    this.setState({
      input: '',
      name: 'Guest',
    });
    fetch('/logout');
  }

  render() {
    return (
      <div>
        <h1 id="welcome">{this.state.message} {this.state.name}</h1>
        <p>Enter your name in the text box below, hit send, then refresh your page. Your name will be remembered.</p>
        <form action="">
          <input value={this.state.input} onChange={e => this.updateInput(e)} />
          <button onClick={e => this.login(e)}>Send</button>
        </form>
        <br />
        <p>Click the button below to see that your name will be forgotten on page reload.</p>
        <button onClick={e => this.logout(e)}>Log Out</button>
      </div>
    );
  }
}
