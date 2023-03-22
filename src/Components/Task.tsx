import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../store/reducers/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task: React.FC<TaskPropsType> = memo(({task, todolistId}) => {

    console.log('task')

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(task.id, todolistId)), [task.id, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked , todolistId))
    }, [task.id, todolistId])

    const editTaskHandler = useCallback((newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTaskTitle, todolistId ))
    }, [task.id, todolistId])

    return (
        <li className={task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
            <EditableSpan OldTitle={task.title} callBack={editTaskHandler} />
            <IconButton
                onClick={onClickHandler}
                aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </li>
    );
});

