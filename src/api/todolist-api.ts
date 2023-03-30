import axios from 'axios'


// const settings = {
//     withCredentials: true,
//     headers: {
//         // Не забываем заменить API-KEY на собственный
//         'API-KEY': '18834bd2-c0a1-4861-8b70-0a39eda94260',
//     },
// }

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '18834bd2-c0a1-4861-8b70-0a39eda94260'
    }
})

export const todolistAPI = {
    updateTodolist(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
            .then(res => res.data)
    },
    getTodolists() {
        return instance.get<TodoListType[]>('todo-lists')
            .then(res => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title})
            .then(res => res.data)
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    }
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

// type CreateTodoListType = {
//     resultCode: number
//     messages: string[]
//     data: {
//         item: TodoListType
//     }
// }

// type UpdateTodoListType = {
//     resultCode: number
//     messages: string[]
//     data: {}
// }

// type DeleteTodoListType = {
//     resultCode: number
//     messages: string[]
//     data: {}
// }