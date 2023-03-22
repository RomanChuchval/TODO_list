
import {v1} from 'uuid';
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

export type SecondActionType = ReturnType<typeof addTaskAC>
export type FirstActionType = ReturnType<typeof removeTaskAC>
export type ThirdActionType = ReturnType<typeof changeTaskStatusAC>
export type FourActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = FirstActionType
    | SecondActionType
    | ThirdActionType
    | FourActionType
    | AddTodolistAT
    | RemoveTodolistAT

export type TasksType = {
    [key: string] : Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case 'ADD-TASK':
            const newTask = { id: v1(), title: action.title, isDone: false }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }

        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                ? {...t, isDone: action.isDone}
                : t
                )}

        case "CHANGE-TASK-TITLE":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t
                )}

        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}

        case "REMOVE-TODOLIST":
            const copy = {...state}
            delete copy[action.payload.todolistId]
            return copy
        default:
            return state
    }
}

export const removeTaskAC = (taskId:string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', todolistId , title} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId:string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}