import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import { useApp } from "../context/AppContext.jsx";

const inputClass =
  "mt-2 w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] text-primary-900 outline-none placeholder:text-gray-400 focus:border-primary-500";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [message] = useState(location.state?.message || "");

  const submit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === password,
    );

    if (!existingUser) {
      setError(
        "Account not found or password is incorrect. Please register or try again.",
      );
      return;
    }

    login(existingUser.email, existingUser.name);
    navigate("/", { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to return to the homes you've saved."
      footer={
        <>
          New to Estately?{" "}
          <Link
            to="/register"
            className="border-b border-primary-900 pb-0.5 font-semibold text-primary-900"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-5">
        {message && (
          <p role="status" className="text-[12px] text-green-700">
            {message}
          </p>
        )}

        <label className="block text-[12px] font-medium text-primary-900">
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
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
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="Your password"
              autoComplete="current-password"
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
          Sign in
          <ArrowRight size={16} strokeWidth={1.5} />
        </motion.button>
      </form>

      <p className="mt-5 text-[11px] leading-5 text-gray-500">
        Preview mode: sign-in is available only for accounts registered in this
        browser.
      </p>
    </AuthLayout>
  );
}
