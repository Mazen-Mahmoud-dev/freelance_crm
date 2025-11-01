import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RegisterForm({ toggleAuth }) {
  const [loading, setLoading] = useState(false);

  // ✅ إعداد react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);

    const { email, username, password } = data;

    const { data: result, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data:{username},
        emailRedirectTo: `${window.location.origin}/auth/verify`,
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("✅ Email Verification Link sent successfully");
      // ✅ إدخال username في جدول profiles (اختياري)
      // if (result.user) {
      //   await supabase.from("profiles").insert({
      //     id: result.user.id,
      //     username,
      //   });
      // }
      reset();
    }
  };

  return (
    <div className="absolute w-full bg-bg shadow-xl rounded-2xl p-8 rotate-y-180 backface-hidden">
      <h2 className="text-2xl font-bold mb-2 text-center">Join Us Today</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Create your account and start exploring
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          {...register("email", {
            required: "Email Address is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid Email Address",
            },
          })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "اسم المستخدم مطلوب",
            minLength: {
              value: 3,
              message: "اسم المستخدم يجب أن يكون 3 أحرف على الأقل",
            },
          })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.username && (
          <p className="text-red-600 text-sm">{errors.username.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "password required",
            minLength: {
              value: 6,
              message: "password length must be at least 6 charachters",
            },
          })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "تأكيد كلمة المرور مطلوب",
            validate: (value) =>
              value === password || "password didn't match",
          })}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={toggleAuth}
          className="text-blue-500 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}
