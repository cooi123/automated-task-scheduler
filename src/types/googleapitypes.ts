export type GoogleTask = {
    title: string,
    notes: { tag: string, urgency: string, dueTime: Date, notes: string[] },
    due: Date
    completed: Date
    status: 'needsAction' | 'completed'

}

export type GoogleEvent = {
    summary: string
    description: string,
    title: string,
    notes: string,
    start: {
        dateTime: Date,
        timeZone: string
    }
    end: {
        dateTime: Date,
        timeZone: string
    }

}