import React, { useEffect, useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import '../../styles/revenueChart.css';
import axios from 'axios';


const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState('Daily');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/revenue/${timeframe.toLowerCase()}`
        );
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch revenue:', err);
      }
    };
    fetchRevenue();
  }, [timeframe]);
  console.log(data);

  const getBarColor = (value) => {
    if (value >= 70) return '#D1D5DB';
    if (value >= 50) return '#E5E7EB';
    return '#F3F4F6';
  };

  const timeframeOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="revenue-container">
      <div className='pie-chart-header'>
        <p style={{fontSize:"14px", marginLeft:"5px", marginLeft:"10px"}}>Revenue</p>
        <p style={{fontSize:"10px", marginTop:"5px", marginLeft:"10px"}}>Order summary overview</p>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="pie-dropdown-button">
          {timeframe}
          <ChevronDown size={16} className={` ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {dropdownOpen && (
          <div className="pie-dropdown-menu">
            {timeframeOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                setTimeframe(option);
                setDropdownOpen(false);
                }}
                className="pie-dropdown-option">
                {option}
              </button>))}
          </div>)}
      </div>
      <div className='bar-chart-container'>
        {data.length > 0 ? (<ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              dy={10}
            />
            <YAxis hide />
            <Bar
              dataKey="barValue"
              fill="#F3F4F6"
              radius={[4, 4, 0, 0]}
              shape={(props) => {
              const { payload } = props;
                return (
                    <rect
                      {...props}
                      fill={getBarColor(payload.value)}
                    />);}}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1F2937"
              strokeWidth={2.5}
              dot={false}
              activeDot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>) : (<p style={{padding:"10px 10px", color:"#6E6E6E"}}>Loading...</p>)}
      </div>
    </div>
  );
};

export default RevenueChart;
