import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {SuperInput} from "./Components/SuperInput";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string] : Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>( state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(todolistId: string, taskId: string) {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    function addTask(todolistId: string, title: string) {
        dispatch(addTaskAC(title, todolistId ))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId ))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, value ))
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const addTodoList = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }

    const editTask = (todoListID: string, taskID: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTaskTitle, todoListID  ))
    }

    const changeTodoListTitle = (todoListID: string, newTodoListTitle: string) => {
        dispatch(changeTodolistTitleAC(todoListID,newTodoListTitle ))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <SuperInput callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }
                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: '30px'}}>
                                    <Todolist
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={el.filter}
                                        removeTodoList={removeTodoList}
                                        editTask={editTask}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
