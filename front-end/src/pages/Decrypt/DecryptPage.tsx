import DecryptForm from "./_components/DecryptForm";
import { AppContext } from "../../auth-provider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const DecryptPage = () => {
  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  if (isAuth === false) {
    navigate("/login");
  }

  return (
    <>
      <DecryptForm />
    </>
  );
};

export default DecryptPage;
