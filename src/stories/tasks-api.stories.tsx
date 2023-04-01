import React, {useEffect, useState} from 'react';
import {GetTasksItemsType, tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}

const todoListId = '5a35dc2f-e7ca-43ed-8f94-f13fb6d0e963'

export const createTask = () => {
    const [tasks, setTasks] = useState<GetTasksItemsType | null>(null)
    const newTaskTitle = 'Learn JS'

    useEffect(() => {
        tasksAPI.createNewTask(todoListId, newTaskTitle)
            .then(data => {
                setTasks(data.data.data.item)
            })
    }, [])

    return (
        <div>
            <span> {tasks?.title} </span>
            <span> ID: - {tasks?.id} </span>
        </div>
    );
};


export const getTasks = () => {
    const [tasks, setTasks] = useState<GetTasksItemsType[]>([])

    useEffect(() => {
        tasksAPI.getTasks(todoListId)
            .then(data => {
                setTasks(data.data.items)
                // console.log(data);
            })
    }, [])

    const tasksList = tasks.map(task => {
        return (
            <li>{task.title}. ID: - {task.id}</li>
        )
    })

    return (
        <div>
            <ul>
                {tasksList}
            </ul>
        </div>
    );
};

export const updateTask = () => {
    const [tasks, setTasks] = useState<GetTasksItemsType | null>(null)

    const updatedTaskTitle = 'NEW TITLE'
    const taskId = '935a1856-517b-4eab-a6f6-a3eaf3688c29'

    useEffect(() => {
        tasksAPI.updateTaskTitle(todoListId, taskId, updatedTaskTitle)
            .then(res => setTasks(res.data.data.item))
    }, [])

    return (
        <div>
           <span> {tasks?.title} </span>
           <span> ID: - {tasks?.id} </span>
        </div>
    );
};

export const deleteTask = () => {
    const [tasks, setTasks] = useState<any>(null)
    const taskId = '79e2b0a2-1b7e-4ee4-8738-8d260d85570c'

    useEffect(() => {
        tasksAPI.deleteTask(todoListId, taskId)
            .then(res => res)
    }, [])

    return (
        <div>

        </div>
    );
};
