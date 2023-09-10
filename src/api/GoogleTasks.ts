import { GoogleTask } from "../types/googleapitypes";

export async function getAllTaskLists(token: string) {
    const url = "https://www.googleapis.com/tasks/v1/users/@me/lists";

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

export async function getAllTasksFromCategory(token: string, tasklistId: string) {
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

export async function createTasks(token: string, tasklistId: string, task: GoogleTask) {
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
    console.log("successfully added task")
    return tasks;
}

export async function createTasksList(token: string, title: string) {
    const tasks = await fetch(
        "https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title })
    }
    ).then((res) => res.json())
    return tasks
}