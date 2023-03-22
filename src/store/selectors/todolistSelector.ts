import {AppRootStateType} from "../store";

export const todolistSelector = (state: AppRootStateType) => {
    return state.todolists
}