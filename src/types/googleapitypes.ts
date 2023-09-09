export type GoogleTask = {
    title: string,
    notes: { category: string, urgency: string, dueTime?: Date, notes?: string[], estimatHourToComplete: number },
    due: Date
    completed?: Date
    status: 'needsAction' | 'completed'

}
export type GoogleTaskList = {
    id: string,
    title: string,
}

export type GoogleEvent = {
    summary: string
    description?: string,
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

export const events: GoogleEvent[] = [
    {
        summary: "Team Meeting",
        description: "Monthly team sync-up.",
        title: "Team Sync-up",
        notes: "Discuss monthly targets and achievements.",
        start: {
            dateTime: new Date("2023-09-10T10:00:00"),
            timeZone: "America/New_York",
        },
        end: {
            dateTime: new Date("2023-09-10T11:00:00"),
            timeZone: "America/New_York",
        },
    },
    {
        summary: "Doctor Appointment",
        title: "Check-up with Dr. Smith",
        notes: "Routine check-up and discuss test results.",
        start: {
            dateTime: new Date("2023-09-11T14:00:00"),
            timeZone: "America/Los_Angeles",
        },
        end: {
            dateTime: new Date("2023-09-11T15:00:00"),
            timeZone: "America/Los_Angeles",
        },
    },
    {
        summary: "Project Deadline",
        title: "Submit Final Report",
        notes: "Ensure all sections are reviewed.",
        start: {
            dateTime: new Date("2023-09-15T09:00:00"),
            timeZone: "Europe/London",
        },
        end: {
            dateTime: new Date("2023-09-15T17:00:00"),
            timeZone: "Europe/London",
        },
    },
];

