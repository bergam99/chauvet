import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();
  const [msg, setMsg] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (isSuccess) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { password, confirmPassword };
    resetPassword({ token: params?.token, body: data });

    if (password !== confirmPassword) {
      setMsg("Mot de passe n'est pas identique. Essayer de nouveau!");
    }
    if (isSuccess) {
      setMsg("Mot de passe a été changé avec succès.");
    }
    if (error) {
      setMsg(error.data.message);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Changer mon mot de passe</h2>

      <div>
        <label htmlFor="password_field">Nouveau mot de passe</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="confirm_password_field">
          Confirmation de mot de passe
        </label>
        <input
          type="password"
          name="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Confirmer"}
      </button>
      {msg}

      <p>* sont obligatoires.</p>
    </form>
  );
};

export default ResetPassword;
