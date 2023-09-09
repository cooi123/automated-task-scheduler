export type task = {
    title: string,
    notes: string,
    due: Date
}

export type event = {
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