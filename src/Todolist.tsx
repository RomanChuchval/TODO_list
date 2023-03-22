import React, {memo, useCallback} from 'react';
import {SuperInput} from "./Components/SuperInput";
import {EditableSpan} from "./Components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {ButtonHoc} from "./Components/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./store/reducers/todolists-reducer";
import {addTaskAC} from "./store/reducers/tasks-reducer";
import {Task} from "./Components/Task";
import {FilterValuesType} from "./App";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    todolistId: string
}

export const Todolist = memo((props: TodoListPropsType) => {

    console.log('todolist')

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistId, "all")), [props.todolistId])

    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistId, "active")), [props.todolistId])

    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todolistId, "completed")), [props.todolistId])

    const removeTodoListHandler = useCallback(() => {
        dispatch(removeTodolistAC(props.todolistId))
    }, [props.todolistId])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }, [props.todolistId])

    const onChangeTitleHandler = useCallback((newTodoListTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todolistId, newTodoListTitle))
    }, [props.todolistId])

    const filteringTasks = () => {
        if (props.filter === 'completed') {
            return tasks.filter(t => t.isDone === true)
        } else if (props.filter === 'active') {
            return tasks.filter(t => t.isDone === false)
        } else {
            return tasks
        }
    }

    // const filteredTasks = useMemo( () => filteringTasks(), [tasks, props.filter])
     const filteredTasks = filteringTasks()

    const tasksForRender = filteredTasks.map(task => {
        return (
            <Task key={task.id}
                  task={task}
                  todolistId={props.todolistId}
            />
        )
    })

    return <div>
        <h3><EditableSpan OldTitle={props.title} callBack={onChangeTitleHandler}/>
            <IconButton
                onClick={removeTodoListHandler}
                aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </h3>
        <SuperInput callback={addTaskHandler}/>
        <ul>
            {tasksForRender}
        </ul>
        <div>

            <ButtonHoc name={'All'} callback={onAllClickHandler} btnColor={'success'}
                       variant={props.filter === 'all' ? 'outlined' : 'contained'}/>
            <ButtonHoc name={'Active'} callback={onActiveClickHandler} btnColor={'success'}
                       variant={props.filter === 'active' ? 'outlined' : 'contained'}/>
            <ButtonHoc name={'Completed'} callback={onCompletedClickHandler} btnColor={'success'}
                       variant={props.filter === 'completed' ? 'outlined' : 'contained'}/>
        </div>
    </div>
})
