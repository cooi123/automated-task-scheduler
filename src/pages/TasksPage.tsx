import React from "react";
import TaskCard from "../components/tasks/TaskCardView";
import {Task} from "../types/types";
import {TaskCategory} from "../components/tasks/TaskCategory";

export function TasksPage() {
  const sampleTasks = [
    {
      title: "Finish React Assignment",
      tag: "Work",
      urgency: "High",
      due: new Date(),
    } as Task,
    {
      title: "Finish React Assignment",
      tag: "Work",
      urgency: "High",
      due: new Date(),
    } as Task,
  ];

  return (
    <div>
      <TaskCategory tasks={sampleTasks} category="Work" />
    </div>
  );
}
