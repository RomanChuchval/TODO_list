import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'USE EFFECT'
       todolistAPI.createTodolist(title)
            .then(res => {
                setState(res.data.item)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'd86379eb-8a22-4925-9202-ccca84a74f59'
        todolistAPI.deleteTodolist(todoId)
            .then(res => {
                JSON.stringify(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}



export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'd86379eb-8a22-4925-9202-ccca84a74f59'
        const title = 'NEXT JS'
        todolistAPI.updateTodolist(todoId, title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}