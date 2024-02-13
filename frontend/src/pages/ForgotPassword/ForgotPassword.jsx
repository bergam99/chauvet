import React, { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // console.log({ data });
  console.log(error?.data?.message);
  // console.log(error);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({ email });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Forgot Password</h2>
        <div>
          <label htmlFor="email_fieldl">Enter Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "En cours d'envoie..." : "Envoyer"}
        </button>
        {error ? error.data.message : isSuccess && "Email a été envoyé."}
      </form>
    </div>
  );
};

export default ForgotPassword;
