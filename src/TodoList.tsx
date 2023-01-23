import React, {ChangeEvent, useRef, KeyboardEvent, useState} from 'react';
import './App.css'
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle !== '') {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
    }
    // const onClickHandlerAll = () => props.changeFilter('all')
    // const onClickHandlerActive = () => props.changeFilter('active')
    // const onClickHandlerCompleted = () => props.changeFilter('completed')
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const errorMessage = error && <span className='error_text'>Task name is required!</span>
    const errorInputClass = error ? 'error_input': ''

    let tasksList = props.tasks.length ?
        props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id)
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            return (
                <li key={task.id} className={task.isDone ? "task_completed" : "task"}>
                    <input onChange={changeStatus} type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your task list is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={errorInputClass}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            {errorMessage}
            <ul>
                {tasksList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active_btn' : ''}
                        onClick={handlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active_btn' : ''}
                        onClick={handlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active_btn' : ''}
                        onClick={handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;