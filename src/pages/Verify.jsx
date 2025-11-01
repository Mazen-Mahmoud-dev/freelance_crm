import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Verify() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const session = data?.session;

        if (session) {
          toast.success("🎉 Your email has been verified successfully!");
          navigate("/dashboard");
        } else {
          toast.success("✅ Email verified! You can now log in.");
          navigate("/login");
        }
      } catch (err) {
        toast.error("An error occurred while verifying your email.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    handleVerification();

    // Optional: listen to auth state in case session updates automatically
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      {loading ? (
        <p className="text-gray-600 text-lg animate-pulse">
          Verifying your email address...
        </p>
      ) : (
        <p className="text-green-600 text-lg">Verification completed successfully ✨</p>
      )}
    </div>
  );
}
