import React, { useState } from 'react';

export default function TodoList() {
  /*
    useState hook:
    Use a new state called 'title', it returns an array with 2 elements.
    The first one is the state value which is immutable.
    the second one is a function which sets the state 'title'.

    Lastly, the string 'Hello World' passed into the useState hook is the
    initial value of the state 'title'.
  */
  const [title, setTitle] = useState('Hello World');

  /*
    Originally, in ES6 class mode, every events need to use the `this`
    keyword to bind the React component instance in order to use 
    this.setState to update the state.

    However, in functional component, everything is in the same scope
    which we don't have to use the `this` keyword and simplifies a lot
    of code.
  */
  const handleInputChange = function (event) {
    const { value } = event.target;
    setTitle(value);
  };

  /*
    Because everything are in the functional scope, we don't need to use
    the `this` keyword to reference our state and event handler.
  */
  return (
    <div className="TodoList">
      <h1>{title || 'TITLE'}</h1>
      <input
        onChange={handleInputChange}
        value={title}
        placeholder="Input to change your title"
      />
    </div>
  );
}
