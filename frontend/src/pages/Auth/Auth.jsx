import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  // remplacer ça en useRef
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, data, error }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { token } = data || "";

  // console.log({ data });
  // console.log(error?.data?.message);
  // console.log(error);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    login(loginData);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        <div>
          <label htmlFor="email_field">Email</label>
          <input
            type="email"
            id="email_field"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password_field">Password</label>
          <input
            type="password"
            id="password_field"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Se connecter"}
        </button>
        <p>{token ? "vous êtes maintenant connecté" : ""}</p>

        <p>{error ? error.data.message : ""}</p>

        <a href="/password/forgot">mot de passe oublié?</a>

        <div>
          <Link to="/register">Créer mon compte</Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;
