import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
    setFilteredTasks(res.data);
  };

  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const createTask = async () => {
    if (!title.trim()) return alert("Title required");

    const res = await API.post("/tasks/create", {
      title,
      description,
    });

    setTasks([res.data, ...tasks]);
    setFilteredTasks([res.data, ...tasks]);

    setTitle("");
    setDescription("");
  };

  const toggleStatus = async (id) => {
    const res = await API.put(`/tasks/toggle/${id}`);
    const updated = tasks.map((task) =>
      task._id === id ? res.data : task
    );

    setTasks(updated);
    setFilteredTasks(updated);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/delete/${id}`);
    const updated = tasks.filter((task) => task._id !== id);

    setTasks(updated);
    setFilteredTasks(updated);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 p-4">

        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full mb-6 px-4 py-2 border rounded-lg shadow-sm"
        />

        {/* Add Task Input */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Add New Task</h2>

          <input
            type="text"
            className="w-full border p-2 rounded mb-3"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded mb-3"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={createTask}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded shadow mb-4 flex justify-between items-start"
            >
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h3>

                <p className="text-gray-600">{task.description}</p>

                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(task.createdAt).toLocaleString()}
                </p>

                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    task.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleStatus(task._id)}
                />

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
