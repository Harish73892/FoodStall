import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    let json = await responce.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Data");
    }
    if (json.success) {
      localStorage.setItem("UserEmail",userData.email)
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    }
  };
  const onChange = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={userData.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={userData.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success m-3">
            Submit
          </button>
          <Link to="/createuser" className="btn btn-danger m-3">
            I am new User
          </Link>
        </form>
      </div>
    </div>
  );
}
