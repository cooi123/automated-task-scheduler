import React, {useState, useEffect} from "react";
import TaskCard from "../components/tasks/TaskCardView";
import {Task, TaskList, sampleTasks} from "../types/types";
import TasksGrid from "../components/tasks/TaskCategory";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {getFutureEvents, scheduleEvent} from "../api/GoogleCalendar";
import {GoogleEvent, GoogleTask, GoogleTaskList} from "../types/googleapitypes";
import {sendGPT} from "../api/OpenAI";
import {
  getAllTaskLists,
  getAllTasksFromCategory,
  createTasks,
  createTasksList,
} from "../api/GoogleTasks";
import TaskForm from "../components/tasks/TaskForm";

async function submitTasks(
  token: string,
  task: Task[],
  setTasks: any,
  setIsLoading: any
) {
  if (!token) {
    alert("Please login first");
    return;
  }
  setIsLoading(true);
  const tasksFromStorage = localStorage.getItem("TASKS");
  const allTasks = tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
  const newTasks = [...allTasks, ...task];
  localStorage.setItem("TASKS", JSON.stringify(newTasks));
  const taskRes = task.map((task) => addTask(token, task));
  const events = await getFutureEvents(token);
  console.log(events);
  const simplifiedEvents: GoogleEvent[] = events.map((event: any) => ({
    summary: event.summary,
    description: event?.description,
    start: event.start,
    end: event.end,
  }));
  const response = await sendGPT(task, simplifiedEvents);
  console.log(response);
  insertEventToCalendar(token, response);
  setTasks([]);
  setIsLoading(false);
}

async function insertEventToCalendar(token: string, events: GoogleEvent[]) {
  events.map((event) => scheduleEvent(token, event));
}

export async function addTask(token: string, task: Task) {
  const taskLists = await getAllTaskLists(token).then((res) => res.items);
  const categoryId: string = taskLists
    ? taskLists.find((list: any) => list.title === task.category)
    : null;
  const googleTask: GoogleTask = {
    ...task,
    notes: {
      category: task.category,
      urgency: task.urgency as string,
      estimatHourToComplete: task.estimatHourToComplete,
    },
    status: "needsAction",
  };
  if (!categoryId) {
    const newId = await createTasksList(token, task.category).then(
      (res) => res.id
    );
    console.log("new id " + newId);
    const res = await createTasks(token, newId, googleTask);
    return res;
  }
  const res = await createTasks(token, categoryId, googleTask);
}

export function TasksPage() {
  const session = useSession();
  const token = session?.provider_token as string;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="container mx-auto mt-6 p-4">
      <div className="grid grid-cols-2 gap-4">
        {}
        <div>
          <TasksGrid tasks={tasks} setTasks={setTasks}></TasksGrid>
        </div>
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg flex items-center space-x-3">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
              <div>Loading...</div>
            </div>
          </div>
        )}

        {/* Right Side - Form */}
        <div>
          {/* Conditional rendering of the form */}
          {<TaskForm setTasks={setTasks} />}
        </div>
        {tasks.length > 0 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
            onClick={() => submitTasks(token, tasks, setTasks, setIsLoading)}
          >
            Submit
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
