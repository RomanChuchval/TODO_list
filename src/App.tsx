import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {SuperInput} from "./Components/SuperInput";
import {ButtonAppBar} from "./Components/ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {addTodolistAC} from "./store/reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {todolistSelector} from "./store/selectors/todolistSelector";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {
    console.log('App')

    let todolists = useSelector(todolistSelector)
    const dispatch = useDispatch()

    const addTodoList = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <SuperInput callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: '30px'}}>
                                    <Todolist
                                        todolistId={el.id}
                                        title={el.title}
                                        filter={el.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
