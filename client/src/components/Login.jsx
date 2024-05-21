import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: userName,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:4000", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = await response.data;
      dispatch(setUser(userData));
      switch (userData.roleId) {
        case 1:
          navigate("/adminhome");
          break;
        case 2:
          navigate("/CompanyHome");
          break;
        case 3:
          navigate("/UserHome");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center p-10">
      <div className="flex justify-center flex-col gap-3 p-5 w-full max-w-[300px] border bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl mb-5 font-bold text-center text-blue-700">
          Login
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col w-full">
            <label className="p-2 font-bold"> User Name : </label>
            <input
              type="text"
              required
              name="username"
              value={userName}
              placeholder="Enter your username "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="p-2 font-bold"> Password : </label>
            <input
              type="password"
              name="password"
              required
              value={password}
              placeholder="Enter your password "
              className="p-2 bg-slate-100 rounded-md outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <button
              type="submit"
              className="w-full p-2 text-white font-bold bg-blue-700 rounded-md"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
