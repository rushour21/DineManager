import React, { useEffect, useState } from 'react'
import "../../styles/pieChart.css"
import { ChevronDown } from 'lucide-react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Recharts Pie Chart Component
const OrderPieChart = ({ data }) => {
  const total = (data?.served || 0) + (data?.dineIn || 0) + (data?.takeAway || 0);
  
  const chartData = [
    {
      name: 'Take Away',
      value: data?.takeAway || 0,
      percentage: total > 0 ? Math.round(((data?.takeAway || 0) / total) * 100) : 0,
      color: '#666666'
    },
    {
      name: 'Served',
      value: data?.served || 0,
      percentage: total > 0 ? Math.round(((data?.served || 0) / total) * 100) : 0,
      color: '#999999'
    },
    {
      name: 'Dine in',
      value: data?.dineIn || 0,
      percentage: total > 0 ? Math.round(((data?.dineIn || 0) / total) * 100) : 0,
      color: '#333333'
    }
  ].filter(item => item.value > 0); // Only show segments with data

  const colors = ['#666666', '#999999', '#333333'];

  if (total === 0) {
    return (
      <div className="recharts-pie-container">
        <div className="empty-chart">
          <div className="empty-circle"></div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recharts-pie-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={40}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="none"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Percentage Bar Chart Component
const PercentageChart = ({ data }) => {
  // Calculate total and percentages
  const total = (data?.served || 0) + (data?.dineIn || 0) + (data?.takeAway || 0);
  
  const chartData = [
    {
      name: 'Take Away',
      value: data?.takeAway || 0,
      percentage: total > 0 ? Math.round(((data?.takeAway || 0) / total) * 100) : 0
    },
    {
      name: 'Served',
      value: data?.served || 0,
      percentage: total > 0 ? Math.round(((data?.served || 0) / total) * 100) : 0
    },
    {
      name: 'Dine in',
      value: data?.dineIn || 0,
      percentage: total > 0 ? Math.round(((data?.dineIn || 0) / total) * 100) : 0
    }
  ];

  return (
    <div className="percentage-chart">
      {chartData.map((item, index) => (
        <div key={item.name} className="chart-row">
          <div className="chart-label">{item.name}</div>
          <div className="chart-percentage">({item.percentage}%)</div>
          <div className="chart-bar-container">
            <div
              className={`chart-bar ${item.name === 'Dine in' ? 'bar-dark' : 'bar-light'}`}
              style={{ 
                width: `${item.percentage}%`,
                transition: 'width 0.8s ease-out'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function piechart() {
  const [timeframe, setTimeframe] = useState('Monthly');
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);

  const timeframeOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/summary/${timeframe.toLowerCase()}`
        );
        setData(response.data.data);
      } catch (err) {
        console.error('Failed to fetch revenue:', err);
      }
    };
    fetchSummary();
  }, [timeframe]);
  
  console.log(data);

  return (
    <div className='pie-chart'>
      <div className='pie-chart-header'>
        <p style={{fontSize:"14px", marginLeft:"10px"}}>Order Summary</p>
        <p style={{fontSize:"10px", marginTop:"5px", marginLeft:"10px"}}>Order summary overview</p>
        <button
              onClick={() => setDropdownOpen(!DropdownOpen)}
              className="pie-dropdown-button"
            >
              {timeframe}
              <ChevronDown size={16} className={` ${DropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {DropdownOpen && (
              <div className="pie-dropdown-menu">
                {timeframeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setTimeframe(option);
                      setDropdownOpen(false);
                    }}
                    className="pie-dropdown-option"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
      </div>
      <div className='pie-details'>
        <div className='detail-block'>
          <p style={{fontSize:"14px", fontWeight:"600"}}>{data.served ? String(data.served).padStart(2, '0') : '00'}</p>
          <p style={{fontSize:"8px"}}>Served</p>
        </div>
        <div className='detail-block'>
          <p style={{fontSize:"14px", fontWeight:"600"}}>{data.dineIn ? String(data.dineIn).padStart(2, '0') : '00'}</p>
          <p style={{fontSize:"8px"}}>Dine In</p>
        </div>
        <div className='detail-block'>
          <p style={{fontSize:"14px", fontWeight:"600"}}>{data.takeAway ? String(data.takeAway).padStart(2, '0') : '00'}</p>
          <p style={{fontSize:"8px"}}>Take Away</p>
        </div>
      </div>
      <div className='details-info'>
        <div className='info-chart'>
          <OrderPieChart data={data}/>
        </div>
        <div className='percentages'>
          <PercentageChart data={data} />
        </div>
      </div>
    </div>
  )
}