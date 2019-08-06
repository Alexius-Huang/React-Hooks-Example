import React from 'react';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    /* Initialize the state in the constructor */
    this.state = { title: 'Hello World' };

    /*
      Event handler should bind itself with the `this` keyword,
      because we need to pass the React component instance in the
      event handler.
    */
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /* We use setState to update the state */
  handleInputChange(event) {
    const { value } = event.target;
    this.setState({ title: value });
  };

  /*
    You need to use the `this` keyword to get the state and the
    event handler.
  */
  render() {
    const { title } = this.state;

    return (
      <div className="TodoList">
        <h1>{title || 'TITLE'}</h1>
        <input
          onChange={this.handleInputChange}
          value={title}
          placeholder="Input to change your title"
        />
      </div>
    );  
  }
}
