import * as React from "react";
import logo from './keyence.png'
import { useNavigate, Link } from "react-router-dom";
import './Navbar.scss'

export default function Navbar() {
  const navigate = useNavigate();

  return (

    <div className="navbar">
      <Link to="/" >
        <img className="img" src={logo} alt="logo" />
      </Link>
      <div>


        <button
          className="boton1"
          onClick={() => navigate("/tasks/view")}
        >
          View File
        </button>

        <button
          className="boton"

          onClick={() => navigate("/tasks/new")}
        >
          New User
        </button>
      </div>

    </div>
  )
}