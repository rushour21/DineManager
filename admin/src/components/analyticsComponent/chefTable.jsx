import React from 'react';
import '../../styles/chefTable.css';

export default function ChefTable({ chefData = [] }) {
  // Defensive check: ensure chefData is an array
  const isValidData = Array.isArray(chefData) && chefData.length > 0;

  return (
    <div className="chef-orders-container">
      <div className="table-wrapper">
        <table className="chef-table">
          <thead>
            <tr>
              <th className="table-header">Chef Name</th>
              <th className="table-header">Order Taken</th>
            </tr>
          </thead>
          <tbody>
            {isValidData ? (
              chefData.map((chef, index) => (
                <tr key={chef._id || chef.name || index} className="table-row">
                  <td className="chef-name">{chef.name}</td>
                  <td className="order-count">{(chef.assignorders || []).length}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">No chef data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
