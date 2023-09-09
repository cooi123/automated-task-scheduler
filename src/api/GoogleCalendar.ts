

const url = "https://www.googleapis.com/calendar/v3/calendars/primary/events"
export async function getFutureEvents(token: string) {
    console.log(token)
    const now = new Date().toISOString();
    const additional = `/?orderBy=startTime&timeMin=${now}&singleEvents=true`
    try {
        const events = await fetch(
            url + additional,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json()).then((data) => data.items)
        return events;
    } catch (e) {
        console.log(e);
    }
}


