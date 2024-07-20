import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AppContext } from "../../auth-provider";
import { signup } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginForm.css";

const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(4, {
        message: "Username must be at least 4 characters.",
      })
      .max(255, {
        message: "Username must not be longer than 255 characters.",
      }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z
      .string()
      .regex(
        new RegExp(".*[A-Z].*"),
        "Must contain at least 1 uppercase character"
      )
      .regex(
        new RegExp(".*[a-z].*"),
        "Must contain at least 1 lowercase character"
      )
      .regex(new RegExp(".*\\d.*"), "Must contain at least 1 number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Must contain at least 1 special character"
      )
      .min(8, "Must be at least 8 characters in length"),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => {
    if (confirmPassword !== password) {
      return { confirmPassword: "Passwords do not match" };
    }
    return true;
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const defaultValues: Partial<SignUpFormValues> = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const { isAuth, setAuth } = React.useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (values: SignUpFormValues) => {
    console.log("HERE")
    try {
      const res = await signup(values.username, values.password, values.email);
      if (res) {
        if (res.status === 201) {
          setAuth(true);
          navigate("/");
          localStorage.setItem("is_admin", res.data.is_admin);
          localStorage.setItem("is_tutor", res.data.is_tutor);
          localStorage.setItem("is_student", res.data.is_student);
          localStorage.setItem("is_supporter", res.data.is_supporter);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again later.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          <FaUser className="icon" />
        </div>
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {/* Add email icon if desired */}
        </div>
        {errors.email && <span className="error">{errors.email.message}</span>}
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <FaLock className="icon" />
        </div>
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
          />
          <FaLock className="icon" />
        </div>
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
        <button type="submit">Sign Up</button>
        <div className="register-link">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
