import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await API.post("/tasks/create", { title, description });
    setTitle("");
    setDescription("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/delete/${id}`);
    loadTasks();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description || "");
  };

  const updateTask = async (id) => {
    await API.put(`/tasks/update/${id}`, {
      title: editTitle,
      description: editDesc,
    });

    setEditId(null);
    setEditTitle("");
    setEditDesc("");
    loadTasks();
  };

  const toggleStatus = async (id) => {
    await API.put(`/tasks/toggle/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6 sm:p-10">

        <h2 className="text-3xl font-bold mb-6">Your Tasks</h2>

        <form
          onSubmit={addTask}
          className="bg-white p-5 rounded shadow mb-6 space-y-3"
        >
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Add Task
          </button>
        </form>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex items-start gap-3 flex-1">

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleStatus(task._id)}
                  className="w-5 h-5 mt-1"
                />

                <div className="flex-1">
                  {editId === task._id ? (
                    <>
                      <input
                        className="border rounded w-full px-2 py-1 mb-2"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <textarea
                        className="border rounded w-full px-2 py-1"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <h3
                        className={`font-semibold text-lg ${
                          task.completed ? "line-through text-green-600" : ""
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="text-gray-600 text-sm mt-1">
                          {task.description}
                        </p>
                      )}

                      <p className="text-gray-400 text-xs mt-1">
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
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-3 sm:mt-0">
                {editId === task._id ? (
                  <button
                    onClick={() => updateTask(task._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
