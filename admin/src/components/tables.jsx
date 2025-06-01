import React, { useEffect, useState } from 'react';
import { LiaChairSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import '../styles/tables.css';
import axios from 'axios';

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [addTable, setAddTable] = useState(false);
  const [chairNumber, setChairNumber] = useState("3");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/tables`);
        if (response.status === 200) {
          setTables(response.data);
        } else {
          console.error("Failed to fetch tables");
        }
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);

  const handleCreateTable = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/tables`, { chairNumber });
      if (response.status === 201) {
        setTables([...tables, response.data]);
        setAddTable(false);
        setChairNumber("3");
      } else {
        console.error("Failed to create table");
      }
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  const handleDeleteTable = async (tableId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/tables/${tableId}`);
      if (response.status === 200) {
        setTables(tables.filter(table => table._id !== tableId));
      } else {
        console.error("Failed to delete table");
      }
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const filteredTables = tables.filter((table) =>
    table.chairNumber.toString().includes(searchTerm.trim())
  );

  return (
    <div className='tables'>
      <div className='searchbar-table'>
        <div className='block'></div>
        <input
          type="text"
          placeholder='Search by chair count'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='table-content'>
        {tables.length > 0 ? (
          <>
            <p style={{ fontSize: '20px', fontWeight: "600", color: "#565656" }}>Tables</p>
            <div className='table-list'>
              {filteredTables.map((table, index) => (
                <div key={table._id} className='table-item'>
                  <p>Table</p>
                  <h2 style={{ fontWeight: "600" }}>{String(index + 1).padStart(2, '0')}</h2>
                  <RiDeleteBin6Line className='delete-icon-table' onClick={() => handleDeleteTable(table._id)} />
                  <div className='table-chair'>
                    <LiaChairSolid />
                    <p>{table.chairNumber}</p>
                  </div>
                </div>
              ))}
              {tables.length < 32 && (
                <div onClick={() => setAddTable(!addTable)} className='add-table'>
                  <FaPlus />
                  {addTable && (
                    <div className='adding-table' onClick={(e) => e.stopPropagation()}>
                      <p style={{ fontSize: "12px" }}>Table Name</p>
                      <p style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: 'center',
                        borderBottom: '1px dashed #BABABA'
                      }}>
                        {String(tables.length + 1).padStart(2, '0')}
                      </p>
                      <p style={{ margin: "10px 0" }}>chair</p>
                      <select name="chair" className='sel-chair' value={chairNumber} onChange={(e) => setChairNumber(e.target.value)}>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button onClick={handleCreateTable} className='create-btn'>Create</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
