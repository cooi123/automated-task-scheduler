import React from "react";
import TaskCard from "./TaskCardView";
import {Task} from "../../types/types";
type TasksGridProps = {
  tasks: Task[];
  setTasks?: any;
};
function TasksGrid({tasks, setTasks}: TasksGridProps) {
  // Group tasks by category
  const groupedByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(groupedByCategory).map(([category, categoryTasks]) => (
        <div key={category}>
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          {categoryTasks.map((task) => (
            <TaskCard key={task.title} task={task} setTasks={setTasks} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TasksGrid;
