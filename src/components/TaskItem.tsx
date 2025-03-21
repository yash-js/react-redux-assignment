import { useState } from "react";
import { Task } from "../types/task";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../redux/taskSlice";

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleSave = () => {
        dispatch(editTask(updatedTask));
        setIsEditing(false);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-3 border border-gray-200">
            {!isEditing ? (
                <>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <span
                            className={`px-2 py-1 rounded text-xs font-bold ${task.status === "To Do"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : task.status === "In Progress"
                                        ? "bg-blue-200 text-blue-800"
                                        : "bg-green-200 text-green-800"
                                }`}
                        >
                            {task.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                    <div className="flex justify-end space-x-2 mt-3">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        >
                         Edit
                        </button>
                        <button
                            onClick={() => dispatch(deleteTask(task.id))}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                        >
                        Delete
                        </button>
                    </div>
                </>
            ) : (
                <div className="p-2 bg-gray-100 rounded">
                    <input
                        type="text"
                        value={updatedTask.title}
                        onChange={(e) =>
                            setUpdatedTask({ ...updatedTask, title: e.target.value })
                        }
                        className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                        value={updatedTask.description}
                        onChange={(e) =>
                            setUpdatedTask({ ...updatedTask, description: e.target.value })
                        }
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="date"
                        value={updatedTask.dueDate}
                        onChange={(e) =>
                            setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
                        }
                        className="w-full p-2 border rounded mb-2"
                    />
                    <select
                        value={updatedTask.status}
                        onChange={(e) =>
                            setUpdatedTask({
                                ...updatedTask,
                                status: e.target.value as Task["status"],
                            })
                        }
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <div className="flex justify-between">
                        <button
                            onClick={handleSave}
                            className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded text-sm"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="cursor-pointer bg-gray-500 text-white px-3 py-1 rounded text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
