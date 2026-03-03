import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authSlice";
import { useEffect } from "react";

const loginSchema = z.object({
  emailId: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should contain atleast 8 characters"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#020617] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-10 flex flex-col text-white"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 tracking-wide">
          Leetcode
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              {...register("emailId")}
              placeholder="john@example.com"
              className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder:text-gray-400"
            />
            {errors.emailId && (
              <span className="text-error text-xs">
                {errors.emailId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              {...register("password")}
              placeholder="••••••••"
              type="password"
              className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder:text-gray-400"
            />
            {errors.password && (
              <span className="text-error text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary px-10 text-base font-semibold tracking-wide shadow-lg shadow-primary/30"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;