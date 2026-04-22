import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/api";
import { setToken } from "../lib/auth";
import { getApiErrorMessage } from "../lib/error";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      setToken(response.data.token);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Signup failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10">
      <section className="grid w-full gap-6 rounded-3xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-2xl backdrop-blur md:grid-cols-2 md:p-10">
        <div className="rounded-2xl bg-linear-to-br from-emerald-500/20 via-cyan-500/10 to-transparent p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            User Dashboard App
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white">
            Create your account.
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            Start tracking your tasks in a personal, protected dashboard.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-slate-950/70 p-6"
        >
          <h2 className="text-xl font-semibold text-white">Signup</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Signup"}
          </button>
          <p className="text-sm text-slate-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
