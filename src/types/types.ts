import { title } from "process"

export type Task = {
    title: string,
    category: string
    urgency: 'High' | 'Medium' | 'Low'
    due: Date
    estimatHourToComplete: number
}

export type TaskList = {
    category: string,
}
export const sampleTasks: Task[] = [
    {
        title: "Finish Report on Market Trends",
        category: "Work",
        urgency: "High",
        due: new Date("2023-09-11"),
        estimatHourToComplete: 5,
    },
    {
        title: "Buy Groceries",
        category: "Personal",
        urgency: "Medium",
        due: new Date("2023-09-10"),
        estimatHourToComplete: 1.5,
    },
    {
        title: "Plan Family Vacation",
        category: "Family",
        urgency: "Low",
        due: new Date("2023-09-20"),
        estimatHourToComplete: 3,
    },
    {
        title: "Submit Expense Report",
        category: "Work",
        urgency: "Medium",
        due: new Date("2023-09-12"),
        estimatHourToComplete: 1,
    },
];