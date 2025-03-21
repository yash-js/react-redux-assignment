import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Task Manager
        </h1>
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
