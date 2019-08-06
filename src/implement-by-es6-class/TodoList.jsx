import React from 'react';
import '../css/TodoList.css';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      list: [
        { title: 'Planning Travel', done: false },
        { title: 'Learn React Hooks', done: false },
        { title: 'Go to Gym', done: true },
        { title: 'Find Job', done: false },
        { title: 'Watch Movie', done: true },
      ],
    };

    this.handleToggleItem = this.handleToggleItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleToggleItem(title) {
    const { list } = this.state;

    const index = list.findIndex(item => item.title === title);
    const newList = Array.from(list);
    newList[index] = { title, done: !newList[index].done };
    this.setState({ list: newList });
  }

  handleRemoveItem(title) {
    const { list } = this.state;

    const index = list.findIndex(item => item.title === title);
    const newList = Array.from(list);
    newList.splice(index, 1);
    this.setState({ list: newList });
  }

  render() {
    const { newItem, list } = this.state;

    return (
      <div className="TodoList">
        <h1>My Todo List</h1>
  
        <input
          type="text"
          placeholder="Create New Item"
          value={newItem}
          onChange={(event) => this.setState({ newItem: event.target.value })}
        />
  
        <ul className="todo-list">
          {
            list.map(({ title, done }) => (
              <li className={done ? 'done' : ''} key={title}>
                <span className="content">{title}</span>
  
                <span className="btn-group">
                  <button
                    className="done-btn"
                    onClick={() => this.handleToggleItem(title)}
                  >{done ? 'Undo' : 'Done'}</button>
                  <button
                    className="remove-btn"
                    onClick={() => this.handleRemoveItem(title)}
                  >Remove</button>
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
