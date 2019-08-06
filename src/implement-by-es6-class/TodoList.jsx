import React from 'react';
import '../css/TodoList.css';

const initialList = [
  { title: 'Planning Travel', done: false },
  { title: 'Learn React Hooks', done: false },
  { title: 'Go to Gym', done: true },
  { title: 'Find Job', done: false },
  { title: 'Watch Movie', done: true },
];

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      list: initialList,
      ctrlPressed: false,
      history: [initialList],
      historyIndex: 0,
    };

    this.handleToggleItem = this.handleToggleItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleKeydownEvent = this.handleKeydownEvent.bind(this);
    this.handleCtrlKeydown = this.handleCtrlKeydown.bind(this);
    this.handleCtrlKeyup = this.handleCtrlKeyup.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydownEvent);
    document.addEventListener('keydown', this.handleCtrlKeydown);
    document.addEventListener('keyup', this.handleCtrlKeyup);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydownEvent);
    document.removeEventListener('keydown', this.handleCtrlKeydown);
    document.removeEventListener('keyup', this.handleCtrlKeyup);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      list,
      history,
      historyIndex,
    } = this.state;

    /* Everytime list is updated, new history appended */
    if (this.state.list !== prevState.list) {
      const newHistory = Array.from(history);
      const newHistoryIndex = historyIndex + 1;
      newHistory.push(list);

      this.setState({
        history: newHistory,
        historyIndex: newHistoryIndex,
      });
    }
  }

  handleKeydownEvent({ keyCode }) {
    const { list, newItem } = this.state;

    /* Enter key - Create new item */
    if (keyCode === 13 && newItem !== '') {
      const newList = Array.from(list);
      newList.unshift({ title: newItem, done: false });

      this.setState({
        list: newList,
        newItem: '',
      });
    }
  }

  handleCtrlKeydown({ keyCode }) {
    if (keyCode === 17) this.setState({ ctrlPressed: true });
  }

  handleCtrlKeyup({ keyCode }) {
    if (keyCode === 17) this.setState({ ctrlPressed: false });
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
