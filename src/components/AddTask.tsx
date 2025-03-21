import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState<Task["status"]>("To Do");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !dueDate) {
            alert("All fields are required!");
            return;
        }

        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            dueDate,
            status,
        };

        dispatch(addTask(newTask));
        setTitle("");
        setDescription("");
        setDueDate("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
        >
            <h2 className="text-lg font-semibold mb-3"> Add New Task</h2>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])}
                className="w-full p-2 border rounded mb-3"
            >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button
                type="submit"
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded w-full"
            >
                Add Task
            </button>
        </form>
    );
};

export default AddTask;
