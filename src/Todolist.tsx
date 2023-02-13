import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {SuperInput} from "./Components/SuperInput";
import {EditableSpan} from "./Components/EditableSpan";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodoList: (todolistId: string) => void
    editTask: (todoListID: string, taskID: string, newTaskTitle: string) => void
    changeTodoListTitle: (todoListID: string, newTodoListTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todolistId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const onChangeTitleHandler = (newTodoListTitle:string) => {
        props.changeTodoListTitle(props.todolistId, newTodoListTitle)
    }

    return <div>
        <h3><EditableSpan OldTitle={props.title} callBack={onChangeTitleHandler} />
            <button onClick={removeTodoListHandler}>x</button>
        </h3>
        <SuperInput callback={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }
                    const editTaskHandler = (newTaskTitle: string) => {
                        props.editTask(props.todolistId, t.id, newTaskTitle)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                                <EditableSpan OldTitle={t.title} callBack={editTaskHandler} />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
