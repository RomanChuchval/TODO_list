import {AppRootStateType} from "../store";

export const tasksSelector = (state: AppRootStateType) => (todolistId: string) => {
    return state.tasks[todolistId]
}