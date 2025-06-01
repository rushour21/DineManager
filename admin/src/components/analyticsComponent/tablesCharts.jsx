import React, { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import axios from 'axios';
import "../../styles/tablesChart.css";

export default function TablesCharts() {
    const [tables, setTables] = useState([]);
    useEffect(() => {
        const fetchTables = async () => {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/tables`);
          if (response.status === 200) {
            setTables(response.data);
          } else {
            console.error("Failed to fetch tables");
          }
        };
        fetchTables();
      }, []);
      console.log('Tables Data:', tables);
  return (
    <div className='table-chart'>
        <div className='table-chart-header'>
            <p className='chart-title'>Tables</p>
            <div className='block-tt'>
                <div style={{display: 'flex', gap: '5px'}}><div style={{backgroundColor: '#3DC35F', width: '10px', height:'10px', borderRadius: '50%'}}></div>Reserved</div>
                <div style={{display: 'flex', gap: '5px'}}><div style={{backgroundColor: '#FFFFFF', width: '10px', height:'10px', borderRadius: '50%'}}></div>Available</div>
            </div>
        </div>
        <div className='table-chart-content'>
            {tables.length >0 ? tables.map((table, index) => (
                <div className='table-chart-card' key={table._id}
                 style={{ backgroundColor: table.isOccupied ? '#3DC35F' : '#FFFFFF', color: table.isOccupied ? '#FFFFFF' : '#000000' }}>
                   <p style={{fontSize: '8px', fontWeight:"400"}}>Table</p>  
                   <p style={{fontSize: '10px', fontWeight:"500"}}>{(index + 1).toString().padStart(2, '0')}</p>
                </div>
            )): <p style={{color:"#565656"}}>Loading...</p>}
        </div>
    </div>
  )
}
