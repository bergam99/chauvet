import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [register, { isLoading, error, data }] = useRegisterMutation();
  const { token } = data || "";
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpData = {
      name,
      email,
      password,
    };

    register(signUpData);
  };

  console.log({ data });
  console.log({ error });
  console.log(error?.data?.messsage);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //   console.log({ data });

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <h2>Créer mon compte</h2>

          <div>
            <label htmlFor="name_field">Nom</label>
            <input
              type="text"
              id="name_field"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Créer mon compte"}
          </button>
          <p>{error ? error?.data?.message : ""}</p>
          <p>{token ? "vous avez créé un compte" : ""}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
