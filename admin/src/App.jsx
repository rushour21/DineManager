import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import Analytics from './components/analytics.jsx';
import OrderCards from './components/orderCards.jsx';
import Menulist from './components/menulist.jsx';
import Tables from './components/tables.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} >
           {/* Nested Routes */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="tables" element={<Tables />} />
          <Route path="orderCards" element={<OrderCards />} />
          <Route path="menulist" element={<Menulist />} />
          {/* Redirect to /analytics if no sub-route is specified */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
