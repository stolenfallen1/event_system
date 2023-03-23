import React from 'react'
import { Link } from 'react-router-dom';
import '../../Styles/admin.css';
import { FaClipboardList, FaKey } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineDashboard } from 'react-icons/ai';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import appLogo from '../../assets/app_logo.png';
import AdminProfile from './AdminProfile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSideBar = () => {

  const handleLogout = () => {
    // perform logout logic here
    // if successful, redirect to /signin and show a success toast after a delay of 2 seconds
    toast.success('Logged out successfully');
    setTimeout(() => {
      window.location.href = '/signin';
    }, 2500);
  }

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
        <li class="link">
          <a href="/Settings">
            <button className="btn-1">
              <FiSettings className="ricon" />
              Settings
            </button>
          </a>
        </li>
        <li class="link">
        <a href="#" alt="logout" onClick={handleLogout}>
          <button className="logout">
            <FiLogOut className="ricon" />
            Logout
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
