

const url = "https://www.googleapis.com/calendar/v3/calendars/primary/events"
export async function getAllCalendarEvents(token: string) {
    const events = await fetch(
        url,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((res) => res.json());
    return events;
}


