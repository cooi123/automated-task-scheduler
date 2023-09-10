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
    <div className="relative flex min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {Object.entries(groupedByCategory).map(
          ([category, categoryTasks], index, arr) => (
            <div
              key={category}
              className={`${
                index < arr.length - 1 ? "border-r-4 border-gray-200 pr-4" : ""
              } pl-4`}
            >
              {/* Added padding to the left (pl-4) and to the right (pr-4) of the category container */}
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="space-y-4">
                {categoryTasks.map((task) => (
                  <TaskCard key={task.title} task={task} setTasks={setTasks} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default TasksGrid;
