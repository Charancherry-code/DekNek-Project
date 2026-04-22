import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/api";
import { getToken, removeToken } from "../lib/auth";
import Spinner from "../components/Spinner";
import { getApiErrorMessage, getApiErrorStatus } from "../lib/error";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      if (getApiErrorStatus(error) === 401) {
        removeToken();
        navigate("/login", { replace: true });
        return;
      }
      toast.error(getApiErrorMessage(error, "Failed to load tasks"));
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    fetchTasks();
  }, [navigate, fetchTasks]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingTaskId(null);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      if (editingTaskId) {
        await api.put(`/tasks/${editingTaskId}`, { title, description });
        toast.success("Task updated");
      } else {
        await api.post("/tasks", { title, description });
        toast.success("Task created");
      }
      resetForm();
      fetchTasks();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not save task"));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description || "");
    setEditingTaskId(task._id);
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not delete task"));
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  if (loading) {
    return <Spinner label="Loading dashboard..." />;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Protected Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Your Tasks</h1>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-rose-400/60 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/10"
        >
          Logout
        </button>
      </header>

      <section className="mb-6 rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 backdrop-blur">
        <form onSubmit={handleSaveTask} className="grid gap-3 md:grid-cols-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            rows={1}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-900 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : editingTaskId ? "Update" : "Add Task"}
            </button>
            {editingTaskId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="grid gap-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-600 bg-slate-900/50 p-6 text-center text-slate-300">
            No tasks yet. Add your first task.
          </div>
        ) : (
          tasks.map((task) => (
            <article
              key={task._id}
              className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 backdrop-blur"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {task.title}
                  </h2>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-300">
                    {task.description || "No description"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="rounded-md border border-cyan-400/60 px-3 py-1 text-sm text-cyan-200 hover:bg-cyan-500/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="rounded-md border border-rose-400/60 px-3 py-1 text-sm text-rose-200 hover:bg-rose-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
