import React from 'react';

/* Shows the example implemented by using React hooks */
import TodoList from './implement-by-hooks/TodoList';

/* Shows the example implemented by using ES6 Class  */
// import TodoList from './implement-by-es6-class/TodoList';

// You can comment out one of the TodoList import, but the implementation
// by both method is equivalent.

import './App.css';

export default () => (
  <div className="App">
    <TodoList />
  </div>
);
