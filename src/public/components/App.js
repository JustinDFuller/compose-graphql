import React from 'react';
import Sessions from './Sessions';

export default class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Hello World</h1>
        <Sessions />
      </div>);
  }
}
