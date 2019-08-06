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
    this.handleUndoOrRedo = this.handleUndoOrRedo.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydownEvent);
    document.addEventListener('keydown', this.handleCtrlKeydown);
    document.addEventListener('keyup', this.handleCtrlKeyup);
    document.addEventListener('keydown', this.handleUndoOrRedo);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydownEvent);
    document.removeEventListener('keydown', this.handleCtrlKeydown);
    document.removeEventListener('keyup', this.handleCtrlKeyup);
    document.removeEventListener('keydown', this.handleUndoOrRedo);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      list,
      ctrlPressed,
      history,
      historyIndex,
    } = this.state;

    /* Everytime list is updated, new history appended */
    /*
      Because undo and redo will change the current list state,
      we need to prevent from modifying the history, so skip
      the history update
    */
    if (!ctrlPressed && this.state.list !== prevState.list) {
      let newHistory = Array.from(history);
      const newHistoryIndex = historyIndex + 1;

      /*
        If the history has been undone and new record appended,
        then we need to clear out the future records and then
        push the new one. 
      */
      if (history.length > historyIndex + 1) {
        newHistory = newHistory.slice(0, newHistoryIndex);
      }
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

  handleUndoOrRedo({ keyCode }) {
    const {
      ctrlPressed,
      history,
      historyIndex,
    } = this.state;

    if (ctrlPressed) {
      /* Control + Z key - Undo */
      if (keyCode === 90 && historyIndex > 0) {
        const newHistoryIndex = historyIndex - 1;
        const previousList = history[newHistoryIndex];

        this.setState({
          list: previousList,
          historyIndex: newHistoryIndex,
        });
      }

      /* Control + Y key - Redo */
      if (keyCode === 89 && historyIndex + 1 < history.length) {
        const newHistoryIndex = historyIndex + 1;
        const nextList = history[newHistoryIndex];

        this.setState({
          list: nextList,
          historyIndex: newHistoryIndex,
        });
      }
    }
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
