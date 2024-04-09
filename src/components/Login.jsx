import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div>
        <div>
          <span>
            <Logo width="100%" />
          </span>
        </div>
        <h2>Sign in to your account</h2>
        <p>
          Dont't have any account? <Link to={"/signUp"}>Sign Up</Link>{" "}
        </p>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit(login)}>
          <div className="">
            <Input
              label="Email: "
              placeholder="Please enter email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Please enter password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button children={"Sign In"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
