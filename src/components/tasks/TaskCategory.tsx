import React from "react";
import TaskCard from "./TaskCardView";
import {Task} from "../../types/types";
interface TaskListProps {
  tasks: Task[];
  category: string; // Filter by this category
}

export function TaskCategory({tasks, category}: TaskListProps) {
  const filteredAndSortedTasks = tasks
    .filter((task) => task.tag === category)
    .sort((a, b) => getUrgencyValue(a.urgency) - getUrgencyValue(b.urgency));
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <h1 className="text-3xl font-bold">Work</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
      </div>
      {filteredAndSortedTasks.map((task) => (
        <TaskCard task={task} />
      ))}
    </div>
  );
}

const getUrgencyValue = (urgency: "High" | "Medium" | "Low") => {
  switch (urgency) {
    case "High":
      return 3;
    case "Medium":
      return 2;
    case "Low":
      return 1;
  }
};
