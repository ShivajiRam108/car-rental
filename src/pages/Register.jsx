// src/pages/Register.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

function emailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function phoneValid(phone) {
  return /^[\d\s\-()+]{7,20}$/.test(phone);
}
function passwordStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 2) return { label: "Weak", width: "33%", color: "bg-red-500" };
  if (s === 3) return { label: "Medium", width: "66%", color: "bg-yellow-500" };
  return { label: "Strong", width: "100%", color: "bg-emerald-500" };
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const strength = useMemo(() => passwordStrength(form.password), [form.password]);

  // Optional: ensure stale flags don't auto-redirect during testing
  useEffect(() => {
    // Do NOT remove if production requires blocking register while logged in
    // This helps when a guard reads isLoggedIn and kicks /register away
    // Comment out if not needed
    // localStorage.removeItem("isLoggedIn");
  }, []);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!emailValid(form.email)) e.email = "Enter a valid email";
    if (!phoneValid(form.phone)) e.phone = "Enter a valid phone";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!form.agree) e.agree = "Please accept the Terms";
    return e;
  }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  }
  function setUsers(arr) {
    localStorage.setItem("users", JSON.stringify(arr));
  }

  function genId() {
    try {
      return crypto.randomUUID();
    } catch {
      return "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    try {
      const users = getUsers();
      const email = form.email.trim().toLowerCase();
      if (users.some((u) => u.email?.toLowerCase() === email)) {
        setErrors((p) => ({ ...p, email: "Email already registered" }));
        toast.error("Email already registered");
        return;
      }

      const newUser = {
        id: genId(),
        name: form.name.trim(),
        email: email,
        phone: form.phone.trim(),
        password: form.password, // demo only; hash on real backend
        role: "User",
        createdAt: new Date().toISOString(),
      };

      setUsers([...users, newUser]);
      localStorage.setItem("lastRegistered", JSON.stringify({ email: newUser.email, name: newUser.name }));

      // Important: do NOT set isLoggedIn here
      toast.success("Account created! Please log in.");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 ">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Create account</h1>
            <p className="mt-1 text-sm text-gray-500">Register to continue to the car rental dashboard</p>
          </div>

          <form onSubmit={onSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  name="name" value={form.name} onChange={onChange}
                  className={`mt-1 block w-full rounded-xl border px-3 py-2 ${errors.name ? "border-red-300 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-gray-200"}`}
                  placeholder="Enter Your name"
                />
                {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={onChange}
                  className={`mt-1 block w-full rounded-xl border px-3 py-2 ${errors.email ? "border-red-300 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-gray-200"}`}
                  placeholder="enter your email"
                />
                {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={onChange}
                  className={`mt-1 block w-full rounded-xl border px-3 py-2 ${errors.phone ? "border-red-300 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-gray-200"}`}
                  placeholder="enter your phone number"
                />
                {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"} name="password" value={form.password} onChange={onChange}
                    className={`mt-1 block w-full rounded-xl border px-3 py-2 pr-12 ${errors.password ? "border-red-300 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-gray-200"}`}
                    placeholder="••••••••" autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600">
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="mt-2">
                  <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div className={`h-1.5 rounded-full ${strength.color}`} style={{ width: strength.width }} />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Strength: {strength.label}</p>
                </div>
                {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                <div className="relative">
                  <input
                    type={showCPw ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={onChange}
                    className={`mt-1 block w-full rounded-xl border px-3 py-2 pr-12 ${errors.confirmPassword ? "border-red-300 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:ring-2 focus:ring-gray-200"}`}
                    placeholder="••••••••" autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowCPw((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600">
                    {showCPw ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword ? <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p> : null}
              </div>

              <div className="flex items-start gap-3">
                <input id="agree" name="agree" type="checkbox" checked={form.agree} onChange={onChange} className="mt-1 h-4 w-4 rounded border-gray-300" />
                <label htmlFor="agree" className="text-sm text-gray-700">I agree to the Terms and Privacy Policy</label>
              </div>
              {errors.agree ? <p className="mt-1 text-xs text-red-600">{errors.agree}</p> : null}

              <button
                type="submit" disabled={loading || !form.agree}
                className={`mt-2 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white ${loading || !form.agree ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-black"}`}
              >
                {loading ? "Creating account…" : "Create account"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-gray-900 underline underline-offset-4">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
