import React from "react";
import TaskCard from "../components/tasks/TaskCardView";
import {Task} from "../types/types";
import {TaskCategory} from "../components/tasks/TaskCategory";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {getFutureEvents, scheduleEvent} from "../api/GoogleCalendar";
import {GoogleEvent, GoogleTask, GoogleTaskList} from "../types/googleapitypes";
import {sendGPT} from "../api/OpenAI";
import {
  getAllTaskLists,
  getAllTasksFromCategory,
  createTasks,
} from "../api/GoogleTasks";
import {get} from "http";

async function submitTasks(token: string) {
  const events = await getFutureEvents(token);
  console.log(events);
  const simplifiedEvents: GoogleEvent[] = events.map((event: any) => ({
    summary: event.summary,
    description: event?.description,
    start: event.start,
    end: event.end,
  }));
  //   const response = await sendGPT(sampleTasks, simplifiedEvents);
  //   console.log(response);
}

async function insertEventToCalendar(token: string, events: GoogleEvent[]) {
  const res = await scheduleEvent(token, events[0]);
  console.log(res);
}

async function getAllTasks(token: string) {
  const taskLists = await getAllTaskLists(token).then((res) => res.items);
  console.log(taskLists);
  const lists: GoogleTaskList[] = taskLists.map((taskList: any) => ({
    id: taskList.id,
    title: taskList.title,
  }));
  const convertToCategory = lists.map((list) =>
    getAllTasksFromCategory(token, list.id)
  );
  const tasks = await Promise.all(convertToCategory);
  console.log(tasks);
  const categorisedTask = tasks.flatMap((task, index) =>
    task.items.map((item: any) => {
      const additionalInfo = item.notes
        ? {
            urgency: item.notes.urgency,
            estimatHourToComplete: item.notes.estimatHourToComplete,
          }
        : {};

      return {
        title: item.title,
        category: lists[index].title,
        due: item.due,
        ...additionalInfo,
      };
    })
  );
  console.log(categorisedTask);
}

export async function addTask(token: string, task: Task) {
  const taskLists = await getAllTaskLists(token).then((res) => res.items);
  const categoryId: string = taskLists.find(
    (list: any) => list.title === task.category
  );
  const googleTask: GoogleTask = {
    ...task,
    notes: {
      category: task.category,
      urgency: task.urgency as string,
      estimatHourToComplete: task.estimatHourToComplete,
    },
    status: "needsAction",
  };

  const res = await createTasks(token, categoryId, googleTask);
}

export function TasksPage() {
  const session = useSession();
  const token = session?.provider_token as string;
  return (
    <div>
      {/* <TaskCategory tasks={sampleTasks} category="Personal" />
      <TaskCategory tasks={sampleTasks} category="Family" />
      <TaskCategory tasks={sampleTasks} category="Work" /> */}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getAllTasks(token)}
      >
        {" "}
        send to gpt{" "}
      </button>
    </div>
  );
}
