import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm({ toggleAuth }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ تسجيل الدخول
  const onSubmit = async (data) => {
    setLoading(true);

    const { email, password } = data;
    const { data: result, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    // ✅ Email verification check
    if (!result.user.email_confirmed_at) {
      toast.error("Please verify your email before logging in.");
      await supabase.auth.signOut(); // Logout just in case
      return;
    }

    toast.success("✅ Logged in successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="absolute w-full backface-hidden bg-bg shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Sign in to continue your journey
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "البريد الإلكتروني مطلوب",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "البريد الإلكتروني غير صالح",
            },
          })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "كلمة المرور مطلوبة",
            minLength: {
              value: 6,
              message: "كلمة المرور يجب ألا تقل عن 6 أحرف",
            },
          })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={toggleAuth}
          className="text-blue-500 hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
