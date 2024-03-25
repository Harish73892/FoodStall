import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Badge} from "@mui/material";
import Cart from "../screen/Cart";
import Model from "../Model";
import { useCart } from "./ContexReducer";


export default function Navbar() {

  let data = useCart();

  const [cartView,setcartView]=useState(false);
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/')
  }

  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand  fs-2 fst-italic" to="/">
            <strong> FOOD-STALL</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fw-bold"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fw-bold"
                    aria-current="page"
                    to="/MyorderData"
                  >
                    My Order
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="d-flex mx-1 ">
              {localStorage.getItem("authToken") ? (
                <>
                  <div
                    className="btn bg-white fw-bold text-success mx-1"
                    onClick={() => {
                      setcartView(true);
                    }}
                  >
                    Cart{"  "}
                    <Badge  className="badge text-white bg-danger" >{ data.length}
                    </Badge>
                  </div>
                  {cartView ? (
                    <Model
                      onClose={() => {
                        setcartView(false);
                      }}
                    >
                      <Cart />
                    </Model>
                  ) : null}
                  <div
                    className="btn bg-white fw-bold text-danger mx-1"
                    onClick={logout}
                  >
                    Log Out
                  </div>
                </>
              ) : (
                <>
                  <Link
                    className="btn bg-white fw-bold text-success mx-1"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn bg-white fw-bold text-success mx-1"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
