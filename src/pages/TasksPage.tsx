import React from "react";
import TaskCard from "../components/tasks/TaskCardView";
import {Task} from "../types/types";
import {TaskCategory} from "../components/tasks/TaskCategory";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {getFutureEvents} from "../api/GoogleCalendar";
import {GoogleEvent} from "../types/googleapitypes";
import {sendGPT} from "../api/OpenAI";
const sampleTasks: Task[] = [
  {
    title: "Finish Report on Market Trends",
    tag: "Work",
    urgency: "High",
    due: new Date("2023-09-11"),
    estimateTimeToComplete: 5,
  },
  {
    title: "Buy Groceries",
    tag: "Personal",
    urgency: "Medium",
    due: new Date("2023-09-10"),
    estimateTimeToComplete: 1.5,
  },
  {
    title: "Plan Family Vacation",
    tag: "Family",
    urgency: "Low",
    due: new Date("2023-09-20"),
    estimateTimeToComplete: 3,
  },
  {
    title: "Submit Expense Report",
    tag: "Work",
    urgency: "Medium",
    due: new Date("2023-09-12"),
    estimateTimeToComplete: 1,
  },
];
async function getLatestCalendarEvent(token: string) {
  const events = await getFutureEvents(token);
  console.log(events);
  const simplifiedEvents: GoogleEvent[] = events.map((event: any) => ({
    summary: event.summary,
    description: event?.description,
    start: event.start,
    end: event.end,
  }));
  const response = await sendGPT(sampleTasks, simplifiedEvents);
  console.log(response);
}

export function TasksPage() {
  const session = useSession();
  const token = session?.provider_token as string;

  return (
    <div>
      <TaskCategory tasks={sampleTasks} category="Personal" />
      <TaskCategory tasks={sampleTasks} category="Family" />
      <TaskCategory tasks={sampleTasks} category="Work" />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getLatestCalendarEvent(token)}
      >
        {" "}
        send to gpt{" "}
      </button>
    </div>
  );
}
