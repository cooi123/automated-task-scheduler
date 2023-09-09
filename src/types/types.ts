export type Task = {
    title: string,
    tag: string
    urgency: 'High' | 'Medium' | 'Low'
    due: Date
    estimateTimeToComplete: number
}