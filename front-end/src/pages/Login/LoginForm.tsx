import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AppContext } from "../../auth-provider";
import { login } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginForm.css";

const signinFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(255, {
      message: "Username must not be longer than 255 characters.",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(255, {
      message: "Password must not be longer than 255 characters.",
    }),
});

type SigninFormValues = z.infer<typeof signinFormSchema>;

const LoginForm = () => {
  const { isAuth, setAuth } = React.useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SigninFormValues) => {
    try {
      const res = await login(values.username, values.password);
      if (res && res.status === 200) {
        setAuth(true);
        navigate("/");
        toast.success(res.data.message);
      } else {
        if (res && res.data) {
          toast.error(res.data.message);
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            required
          />
          <FaUser className="icon" />
        </div>
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            required
          />
          <FaLock className="icon" />
        </div>
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account? <a href="/signup">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
