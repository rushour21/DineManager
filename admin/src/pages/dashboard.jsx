import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar'
import '../styles/dashboard.css';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Sidebar />
      <Outlet />
    </div>
  )
}
