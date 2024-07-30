import EncryptForm from "./_components/EncryptForm";
import { AppContext } from "../../auth-provider";
import { useContext } from "react";
import { useNavigate} from "react-router-dom";

const EncryptPage = () => {
  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  if (isAuth === false) {
    navigate("/login");
  }

  return (
    <>
      <EncryptForm />
    </>
  );
};

export default EncryptPage;
