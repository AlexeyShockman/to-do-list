import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            enteredText: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTaskDone = this.handleTaskDone.bind(this);
        this.handleTaskRemove = this.handleTaskRemove.bind(this);

    }

    componentDidMount() {
        this.setState({
            tasks : localStorage.getItem('tasks') ?
            JSON.parse(localStorage.getItem('tasks')) : []
        })
    }


    renderToDoList() {
        return <ToDoList/>
    }

    render() {
        return (
            <div>
                <h1>TO DO LIST</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        placeholder='..type anything'
                        onChange={this.handleChange}
                        value={this.state.enteredText}
                    />
                    <button>
                        add
                    </button>
                </form>
                <h2>processing</h2>
                <ToDoList tasks={this.state.tasks.filter((task) => {
                    return task.done === false;
                })}
                          handleTaskDone={this.handleTaskDone}
                          handleTaskRemove={this.handleTaskRemove}

                />
                <h2>complete</h2>
                <ToDoList tasks={this.state.tasks.filter((task) => {
                    return task.done === true;
                })}
                          handleTaskDone={this.handleTaskDone}
                          handleTaskRemove={this.handleTaskRemove}
                />
            </div>

        )
    }

    handleTaskDone(position) {
        let newTasks = this.state.tasks;
        for (let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].position === position) {
                newTasks[i].done = !newTasks[i].done;
                this.setState({
                    tasks: newTasks
                });
                localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
                break;
            }
        }
    }

    handleTaskRemove(position) {
        let newTasks = this.state.tasks;
        for (let i = 0; i < newTasks.length; i++) {
            if (newTasks[i].position === position) {
                newTasks.splice(i, 1);
                this.setState({
                    tasks: newTasks
                });
                localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
                break;
            }
        }
    }

    handleChange(e) {
        this.setState({enteredText: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.enteredText.length === 0) {
            return
        }
        const newTask = {
            body: this.state.enteredText,
            position: Date.now(),
            done: false,
        }
        this.setState((state) => ({
            tasks: state.tasks.concat(newTask),
            enteredText: ''
        }))
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

}


class ToDoList extends React.Component {
    render() {
        return (
            <div className='task-list'>
                {this.props.tasks.map((task) => (
                    <div key={task.position}
                         className='task'
                    >
                        <label className="custom-checkbox">
                        <input
                            type='checkbox'
                            value='value-1'
                            checked={task.done}
                            onChange={() => {
                                this.props.handleTaskDone(task.position)
                            }}
                        />
                            <span className='task-body'>{task.body}</span>
                        </label>

                        <button
                            onClick={() => {
                                this.props.handleTaskRemove(task.position)
                            }}
                        >
                            del
                        </button>
                    </div>
                ))}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Board/>,
    document.getElementById('root')
);
