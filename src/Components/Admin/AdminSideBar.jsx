import React from 'react'
import { Link } from 'react-router-dom';
import '../../Styles/admin.css';
import { FaClipboardList, FaKey } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineDashboard } from 'react-icons/ai';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import appLogo from '../../assets/app_logo.png';
import AdminProfile from './AdminProfile';

const AdminSideBar = () => {
  return (
    <div className="admin-dashboard">
    <div className="sidebar">
      <Link to="/">
        <img className="logo" src={appLogo} style={{ width: 275 }} />
      </Link>
      <ul class="links">
        <li class="link">
          <a href="/admin">
            <button className="btn-1">
              <AiOutlineDashboard className="ricon" />
              Dashboard
            </button>
          </a>
        </li>
        <li className="link">
            <AdminProfile />
          </li>
        <li class="link">
          <a href="/signin" alt="logout">
            <button>
              <span className="logout">
                <FiLogOut className="ricon" />
                Logout
              </span>
            </button>
          </a>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default AdminSideBar

    {/* <li class="link">
          <a href="/eventoptions">
            <button className="btn-1">
              <FaClipboardList className="ricon" />
              Event Options
            </button>
          </a>
        </li> */}
        {/* <li class="link">
          <a href="/overview">
            <button className="btn-1">
              <AiOutlineEye className="ricon" />
              Overview
            </button>
          </a>
        </li> */}
        {/* <li class="link">
          <a href="#">
            <button className="btn-1">
              <FaKey className="ricon" />
              Account
            </button>
          </a>
        </li> */}