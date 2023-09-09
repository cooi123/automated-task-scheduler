import React from "react";
import {Task} from "../../types/types";
// import {TrashIcon} from "@heroicons/react/solid";

type TaskCardProps = {
  task: Task;
  setTasks?: any;
};

function TaskCard({task, setTasks}: TaskCardProps) {
  // Determine card background color based on task urgency
  let cardBgColor = "";
  switch (task.urgency) {
    case "High":
      cardBgColor = "bg-red-500";
      break;
    case "Medium":
      cardBgColor = "bg-yellow-500";
      break;
    case "Low":
      cardBgColor = "bg-green-500";
      break;
    default:
      cardBgColor = "bg-gray-300";
  }

  return (
    <div
      className={`max-w-sm mx-auto rounded-xl shadow-md overflow-hidden p-4 mb-4 ${cardBgColor} text-white`}
    >
      <div className="mb-2">
        <span className="font-bold text-xl mb-2">{task.title}</span>
        <span className="text-opacity-80 text-sm ml-2">({task.category})</span>
      </div>

      <div className="mb-2">
        <span className="font-semibold">Due: </span>
        <span>{new Date(task.due).toLocaleDateString()}</span>
      </div>

      <div>
        <span className="font-semibold">Estimated hours to complete: </span>
        <span>{task.estimatHourToComplete}</span>
      </div>
      <button className="p-2 hover:bg-red-500 hover:text-white rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={() =>
            setTasks((prevTasks: Task[]) =>
              prevTasks.filter((prevTask: Task) => prevTask != task)
            )
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}

export default TaskCard;
