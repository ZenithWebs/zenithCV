import React from 'react'
import { Link } from "react-router-dom";
import logo from '../logos/logo.png'

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 w-64 h-screen p-6">
      <div className="text-2xl font-bold text-blue-900 flex gap-1.5 items-center mb-2.5">
        <img src={logo} className="w-10" alt="" /> ZenithCV
      </div>
      
      <ul>
        <li className="mb-4"><Link to="/dashboard">Dashboard</Link></li>
        <li className="mb-4"><Link to="/dashboard/resumes">My Resumes</Link></li>
        <li className="mb-4"><Link to="/dashboard/new">Create Resume</Link></li>
      </ul>
    </aside>
  )
}

export default Sidebar
