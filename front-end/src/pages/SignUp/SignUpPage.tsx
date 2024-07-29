import React, { useEffect } from "react";
import SignupForm from "./SignUpForm";
import { AppContext } from "../../auth-provider";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { isAuth } = React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <SignupForm />
    </div>
  );
};

export default SignUpPage;
