// TaskCard.tsx
import React from "react";
import {Task} from "../../types/types";

interface TaskCardProps {
  task: Task;
}

function TaskCard({task}: TaskCardProps) {
  return (
    <div>
      <div className="flex flex-col bg-white shadow-md rounded-xl p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-gray-700 font-bold text-xl">{task.title}</div>
            <div className="text-gray-500 text-xs">
              {task.due.toDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getColorForUrgency = (urgency: "High" | "Medium" | "Low") => {
  switch (urgency) {
    case "High":
      return "red";
    case "Medium":
      return "orange";
    case "Low":
      return "green";
  }
};

export default TaskCard;
