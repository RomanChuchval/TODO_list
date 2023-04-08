import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";


let startState: Array<TodolistDomainType>;

beforeEach( ()=> {
    startState = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to Byu', filter: 'all', addedDate: '', order: 1}
    ]
})

test('provided todolist should be removed correctly', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].order).toBe(0)
})

test('provided todolist should be added correctly', () => {

    const action = addTodolistAC('idFromBackend', 'titleFromBackend')
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('titleFromBackend')
})

test('provided todolist title should be changed correctly', () => {

    const action = changeTodolistTitleAC('todolistId2', 'NewTitle')
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('NewTitle')
})

test('provided todolist filter should be changed correctly', () => {

    const action = changeTodolistFilterAC('todolistId2', 'active')
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe('active')
})

test('todoLists should be added correctly at empty array', () => {

    const action = setTodolistAC(startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('What to Byu')

})



