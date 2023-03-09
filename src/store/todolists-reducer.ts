import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}

export type AddTodolistAT = {
    type : 'ADD-TODOLIST',
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTodolistTitleAT = {
    type : 'CHANGE-TODOLIST-TITLE'
    payload: {
        todoListId: string
        newTodoListTitle: string
    }
}

export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        todoListId: string
        value: FilterValuesType
    }
}

export type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

const initialState: Array<TodolistsType> = []
export const todolistsReducer = (todolists: Array<TodolistsType> = initialState, action: ActionsType): Array<TodolistsType> => {

    switch(action.type) {

        case "REMOVE-TODOLIST":
            return todolists.filter(el => el.id !== action.payload.todolistId);

        case 'ADD-TODOLIST':
            const newTodoList: TodolistsType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'};
            return [...todolists, newTodoList]

        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.value} : tl)

        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(el => el.id === action.payload.todoListId
                ? {...el, title: action.payload.newTodoListTitle} : el)

        default:
            return todolists
    }
}

export const  removeTodolistAC = ( todolistId: string ):RemoveTodolistAT => {
        return {
            type: "REMOVE-TODOLIST",
            payload: {
                todolistId: todolistId
            }
        }
}

export const addTodolistAC = (title: string): AddTodolistAT => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title,
            todolistId: v1()
        }
    }
}

export const changeTodolistFilterAC = (todoListId: string, value: FilterValuesType): ChangeTodolistFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todoListId,
            value
        }
    }
}

export const changeTodolistTitleAC = (todoListId: string, newTodoListTitle: string ): ChangeTodolistTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todoListId,
            newTodoListTitle
        }
    }
}

