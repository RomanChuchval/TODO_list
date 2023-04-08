import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "./todolists-reducer";
import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from "./tasks-reducer";


let startState: TasksStateType

beforeEach( ()=>{
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ],
        "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]
}})

test('empty arrays for tasks should be added when todolists set', ()=>{

    const todolists:TodolistType[] =  [
        {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to Byu', addedDate: '', order: 1}
    ]

    let action = setTodolistAC(todolists)
    const endState = tasksReducer({}, action)

    expect(Object.keys(endState).length).toBe(2)
    expect(endState['todolistId1']).toBeDefined()
    expect(endState['todolistId2']).toBeDefined()
    expect(endState['todolistId2']).toStrictEqual([])
    expect(endState['todolistId1']).toStrictEqual([])
})

test('provided task should be remove from correct array', ()=>{

    const action = removeTaskAC('1', 'todolistId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][0].id).toBe('2')
    expect(endState['todolistId2'][0].id).toBe('1')

})

test('new task should be added to correct array', ()=>{

    const newTask =  { id: "5", title: "NewTask", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }

    const action = addTaskAC(newTask)
    const endState = tasksReducer(startState, action)

    expect(endState[newTask.todoListId].length).toBe(4)
    expect(endState[newTask.todoListId][0].title).toBe("NewTask")
    expect(endState[newTask.todoListId][0].id).toBe("5")
    expect(endState[newTask.todoListId][3].id).toBe("3")
    expect(endState[newTask.todoListId][3].title).toBe("tea")
})

test('title field of provided task should be changed correctly', ()=>{

    const taskId = startState['todolistId1'][0].id
    const updatedModelField = {title: 'Updated Task Title Field'}
    const todoListId = 'todolistId1'

    const action = updateTaskAC(taskId,updatedModelField,todoListId )
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('Updated Task Title Field')
    expect(endState['todolistId2'][0].title).toBe('bread')
})

test('status field of provided task should be changed correctly', ()=>{

    const taskId = startState['todolistId1'][0].id
    const updatedModelField = {status: TaskStatuses.Completed}
    const todoListId = 'todolistId1'

    const action = updateTaskAC(taskId,updatedModelField,todoListId )
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId1'][2].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('empty array for tasks should be added when new todolist created', ()=>{

    const newTodolistId = 'idFromBackEnd'

    const action = addTodolistAC(newTodolistId, 'New TodoList')
    const endState = tasksReducer(startState, action)

    expect(endState['idFromBackEnd'].length).toBe(0)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['idFromBackEnd']).toBeDefined()
    expect(endState['idFromBackEnd']).toStrictEqual([])

})

test('correct tasks array should be removed when provided todolist deleted', ()=>{

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2']).toBeFalsy()
    expect(endState['todolistId1']).toBeDefined()
    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)).toStrictEqual(["todolistId1"])

})

test('tasks should be set to the correct arrays',()=>{

    const tasksFromServer: TaskType[] = [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]

    const startState = {
        ['todolistId1'] : []
    }

    const action = setTasksAC(tasksFromServer, 'todolistId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1']).toBeDefined()
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('CSS')

})