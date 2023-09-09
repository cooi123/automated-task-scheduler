import React, {useState} from "react";
import {Task} from "../../types/types";

function TaskForm({setTasks}: any) {
  const initialTask: Task = {
    title: "",
    category: "",
    urgency: "Medium",
    due: new Date(),
    estimatHourToComplete: 1,
  };

  const [task, setTask] = useState<Task>(initialTask);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTasks((tasks: Task[]) => [...tasks, task]);
    console.log(task);
    setTask(initialTask);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <form onSubmit={handleSubmit} className="p-8">
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({...task, title: e.target.value})}
            className="mt-1 p-2 w-full rounded-md border-2 border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <input
            type="text"
            value={task.category}
            onChange={(e) => setTask({...task, category: e.target.value})}
            className="mt-1 p-2 w-full rounded-md border-2 border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Urgency:</label>
          <select
            value={task.urgency}
            onChange={(e) =>
              setTask({
                ...task,
                urgency: e.target.value as "High" | "Medium" | "Low",
              })
            }
            className="mt-1 p-2 w-full rounded-md border-2 border-gray-300"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Due Date:</label>
          <input
            type="date"
            value={task.due.toISOString().split("T")[0]}
            onChange={(e) => setTask({...task, due: new Date(e.target.value)})}
            className="mt-1 p-2 w-full rounded-md border-2 border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Estimated Hours to Complete:
          </label>
          <input
            type="number"
            value={task.estimatHourToComplete}
            onChange={(e) =>
              setTask({
                ...task,
                estimatHourToComplete: parseInt(e.target.value),
              })
            }
            className="mt-1 p-2 w-full rounded-md border-2 border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
