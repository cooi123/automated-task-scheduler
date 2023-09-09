import { async } from "q";
import { task } from "../types/googleapitypes";

const url = "https://www.googleapis.com/tasks/v1/users/@me/lists";
export async function getAllTaskLists(token: string) {
    const taskLists = await fetch(
        url,
        {
            method: "Get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((res) => res.json());
    return taskLists;
}


const getTaskURL = (tasklistId: string) => `https://tasks.googleapis.com/tasks/v1/lists/${tasklistId}/tasks`

export async function getAllTasks(token: string, tasklistId: string) {
    const tasks = await fetch(
        getTaskURL(tasklistId),
        {
            method: "Get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((res) => res.json());
    return tasks;
}

export async function createTasks(token: string, tasklistId: string, task: task) {
    const tasks = await fetch(
        getTaskURL(tasklistId),
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task)

        }
    )
        .then((res) => res.json());
    return tasks;
}