import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {SuperInput} from "./Components/SuperInput";
import {EditableSpan} from "./Components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


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
            <IconButton
                onClick={removeTodoListHandler}
                aria-label="delete">
                <DeleteIcon />
            </IconButton>
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
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                                <EditableSpan OldTitle={t.title} callBack={editTaskHandler} />
                        <IconButton
                            onClick={onClickHandler}
                            aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    onClick={onAllClickHandler}
                    color="success">
                All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    onClick={onActiveClickHandler}
                    color="success">
                Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={onCompletedClickHandler}
                    color="success">
                Completed
            </Button>
        </div>
    </div>
}
