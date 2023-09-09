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
} from "../api/GoogleTasks";
import {get} from "http";
import TaskForm from "../components/tasks/TaskForm";

async function submitTasks(token: string, task: Task[]) {
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
  const categorisedTask: Task[] = tasks.flatMap((task, index) =>
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
  return await categorisedTask;
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
  const [tasks, setTasks] = useState<Task[]>([]);

  //   useEffect(() => {
  //     async function fetchTasks() {
  //       try {
  //         const allTasks = sampleTasks;
  //         console.log(allTasks);
  //         setTasks(allTasks);
  //       } catch (error) {
  //         console.error("Error fetching tasks:", error);
  //       }
  //     }

  //     fetchTasks();
  //   }, []); // The empty dependency array means this useEffect runs once when the component mounts

  const [isFormOpen, setFormOpen] = useState(false); // control the collapsible state of the form
  console.log(tasks);
  return (
    <div className="container mx-auto mt-6 p-4">
      <div className="grid grid-cols-2 gap-4">
        {}
        <div>
          <TasksGrid tasks={tasks}></TasksGrid>
        </div>

        {/* Right Side - Form */}
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
            onClick={() => setFormOpen(!isFormOpen)}
          >
            {isFormOpen ? "Hide Form" : "Show Form"}
          </button>

          {/* Conditional rendering of the form */}
          {isFormOpen && <TaskForm setTasks={setTasks} />}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
          onClick={() => submitTasks(token, tasks)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
