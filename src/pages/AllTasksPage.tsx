import {getAllTaskLists} from "../api/GoogleTasks";
import {getAllTasksFromCategory} from "../api/GoogleTasks";
import {Task, sampleTasks} from "../types/types";
import {GoogleTaskList} from "../types/googleapitypes";
import {useState, useEffect} from "react";
import {useSession} from "@supabase/auth-helpers-react";
import TasksGrid from "../components/tasks/TaskCategory";
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

export function AllTasksPage() {
  const tasks = localStorage.getItem("TASKS");
  const [allTasks, setAllTasks] = useState<Task[]>(
    tasks ? JSON.parse(tasks) : []
  );
  // const session = useSession();
  // const token = session?.provider_token as string;
  // console.log(token);
  // useEffect(() => {
  //   async function fetchTasks() {
  //     try {
  //       const allTasks = await getAllTasks(token);
  //       console.log(allTasks);
  //       setAllTasks(allTasks);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   }

  //   fetchTasks();
  // }, []); // The empty dependency array means this useEffect runs once when the component mounts
  console.log(allTasks);
  return (
    <div>
      <TasksGrid tasks={allTasks}></TasksGrid>
      {/* <button onClick={() => getAllTasks(token).then(setAllTasks)}>
        {" "}
        get all tasks
      </button> */}
    </div>
  );
}
