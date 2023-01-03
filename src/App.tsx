import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {

    const todoListTitle_1: string = 'What to learn';
    const todoListTitle_2: string = 'What to buy';

    const tasks_1: Array<TaskType> = [
        {
            id: 1,
            title: 'HTML',
            isDone: true,
        },
        {
            id: 2,
            title: 'React',
            isDone: false,
        },
        {
            id: 3,
            title: 'TypeScript',
            isDone: true,
        },
    ]

    return (
        <div className='App'>
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            {/*<TodoList title={todoListTitle_2} tasks={tasks_1}/>*/}
        </div>
    );
}

export default App;
