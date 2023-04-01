import axios from "axios";
import {log} from "util";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})
export const tasksAPI = {
    getTasks(todolistId: string){
       return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks`)
            .then(res => {
                // console.log(res.data)
                return res
            })
    },
    createNewTask(todolistId: string, newTaskTitle: string){
        return instance.post<OwnResponseType<{ item: GetTasksItemsType }>>(`/todo-lists/${todolistId}/tasks`, {title: newTaskTitle})
            .then(res => {
                // console.log(res.data)
                return res
            })
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<OwnResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => {
                // console.log(res.data)
                return res
            })
    },
    updateTaskTitle(todolistId: string, taskId: string, updatedTaskTitle: string){
        return instance.put<OwnResponseType<{ item: GetTasksItemsType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: updatedTaskTitle})
            .then(res => {
                // console.log(res.data)
                return res
            })
    }
}

export type GetTasksItemsType = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksType = {
    error: string | null
    totalCount: number
    items: GetTasksItemsType[]
}

type OwnResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

// type DeleteTaskType = {
//     data: { }
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }

// type UpdateTaskType = {
//     data: { item: GetTasksItemsType[] }
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }


