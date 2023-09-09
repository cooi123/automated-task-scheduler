import React from "react";
import {Task} from "../../types/types";

type TaskCardProps = {
  task: Task;
};

function TaskCard({task}: TaskCardProps) {
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
    </div>
  );
}

export default TaskCard;
