import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TaskStatus } from "../types/task";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
    const [filterStatus, setFilterStatus] = useState<TaskStatus | "All">("All");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const filteredTasks = filterStatus === "All"
        ? tasks
        : tasks.filter((task) => task.status === filterStatus);

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        return sortOrder === "asc"
            ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    });

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as TaskStatus | "All")}
                    className="p-2 border rounded"
                >
                    <option value="All">All</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Sort by Due Date {sortOrder === "asc" ? "⬆️" : "⬇️"}
                </button>
            </div>
            {sortedTasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks found.</p>
            ) : (
                sortedTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;
