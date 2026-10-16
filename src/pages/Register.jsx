import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout.jsx";

const inputClass =
  "mt-2 w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] text-primary-900 outline-none placeholder:text-gray-400 focus:border-primary-500";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setError("");
  };

  const submit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!form.password) {
      setError("Please enter a password.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password should be at least 8 characters.");
      return;
    }

    if (!form.confirm) {
      setError("Please confirm your password.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("The passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email,
    );

    if (existingUser) {
      setError("An account with this email already exists. Please sign in.");
      return;
    }

    const newUser = {
      name,
      email,
      password: form.password,
    };

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify([...users, newUser]),
    );

    navigate("/login", {
      state: {
        message: "Account created successfully. Please sign in.",
      },
    });
  };

  return (
    <AuthLayout
      title="Come on in."
      subtitle="Create a space for the homes that speak to you."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="border-b border-primary-900 pb-0.5 font-semibold text-primary-900"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        <label className="block text-[12px] font-medium text-primary-900">
          Full name
          <input
            type="text"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className={inputClass}
          />
        </label>

        <label className="block text-[12px] font-medium text-primary-900">
          Email address
          <input
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
          />
        </label>

        <label className="block text-[12px] font-medium text-primary-900">
          Password
          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-4 top-[calc(50%+4px)] -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.5} />
              ) : (
                <Eye size={18} strokeWidth={1.5} />
              )}
            </button>
          </span>
        </label>

        <label className="block text-[12px] font-medium text-primary-900">
          Confirm password
          <input
            type={showPassword ? "text" : "password"}
            value={form.confirm}
            onChange={(event) => update("confirm", event.target.value)}
            placeholder="Confirm your password"
            autoComplete="new-password"
            className={inputClass}
          />
        </label>

        {error && (
          <p role="alert" className="text-[12px] text-red-700">
            {error}
          </p>
        )}

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex w-full items-center justify-center gap-2 bg-primary-900 px-5 py-4 text-[13px] font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Create your account
          <ArrowRight size={16} strokeWidth={1.5} />
        </motion.button>
      </form>

      <p className="mt-5 text-[11px] leading-5 text-gray-500">
        Preview mode: your account is stored in this browser only.
      </p>
    </AuthLayout>
  );
}
