import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoListTitle_1: string = 'What to learn';
    //const todoListTitle_2: string = 'What to buy';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {
            id: v1(),
            title: 'HTML',
            isDone: true,
        },
        {
            id: v1(),
            title: 'React',
            isDone: false,
        },
        {
            id: v1(),
            title: 'TypeScript',
            isDone: true,
        },
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    // useEffect( () => {
    //     console.log(tasks)
    // }, [tasks])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title : string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const filteredTasks = (tasks:Array<TaskType>, filter: FilterValuesType):Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone)
            case 'completed':
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const filteredTasksForRender = filteredTasks(tasks, filter)

    return (
        <div className='App'>
            <TodoList title={todoListTitle_1}
                      tasks={filteredTasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
            {/*<TodoList title={todoListTitle_2} tasks={tasks_2}/>*/}
        </div>
    );
}

export default App;
