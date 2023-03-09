import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {SuperInput} from "./Components/SuperInput";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {
    ActionsType,
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

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

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    function removeTask(todolistId: string, taskId: string) {
        dispatchToTasks(removeTaskAC(taskId, todolistId))
    }

    function addTask(todolistId: string, title: string) {
        dispatchToTasks(addTaskAC(title, todolistId ))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistId ))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchTodolists(changeTodolistFilterAC(todolistId, value ))
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchToTasks(action)
    }

    const addTodoList = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchTodolists(action)
        dispatchToTasks(action)
    }

    const editTask = (todoListID: string, taskID: string, newTaskTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, newTaskTitle, todoListID  ))
    }

    const changeTodoListTitle = (todoListID: string, newTodoListTitle: string) => {
        dispatchTodolists(changeTodolistTitleAC(todoListID,newTodoListTitle ))
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
                            <Grid item>
                                <Paper style={{padding: '30px'}}>
                                    <Todolist
                                        todolistId={el.id}
                                        key={el.id}
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

export default AppWithReducers;
