import React from 'react'
import { MdDashboard, MdEventSeat, MdBarChart } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='logo-s'></div>
        <div className='menu-s'>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? 'menu-item-active' : 'menu-item-s'}>
                <MdDashboard color='black'/>
            </NavLink>

            <NavLink to="/tables" className={({ isActive }) => isActive ? 'menu-item-active' : 'menu-item-s'}>
                <MdEventSeat color='black'/>
            </NavLink>

            <NavLink to="/orderCards" className={({ isActive }) => isActive ? 'menu-item-active' : 'menu-item-s'}>
                <MdBarChart color='black'/>
            </NavLink>

            <NavLink to="/menulist" className={({ isActive }) => isActive ? 'menu-item-active' : 'menu-item-s'}>
                <BiSolidFoodMenu  color='black'/>
            </NavLink>
        </div>
    </div>
  )
}
