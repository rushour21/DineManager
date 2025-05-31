
import React, { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import '../../styles/revenueChart.css';


const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState('Daily');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const data = [
    { day: 'Mon', value: 20, barValue: 100 },
    { day: 'Tue', value: 45, barValue: 100 },
    { day: 'Wed', value: 30, barValue: 100 },
    { day: 'Thu', value: 55, barValue: 100 },
    { day: 'Fri', value: 40, barValue: 100 },
    { day: 'Sat', value: 75, barValue: 100 },
    { day: 'Sun', value: 60, barValue: 100 }
  ];

  const getBarColor = (value) => {
    if (value >= 70) return '#D1D5DB';
    if (value >= 50) return '#E5E7EB';
    return '#F3F4F6';
  };

  const timeframeOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="revenue-container">
      <div className="revenue-card">
        <div className="revenue-header">
          <div>
            <h2>Revenue</h2>
            <p>hijokplrngtmoplgtgkoikokyhikoy[phokphnoy</p>
          </div>
          <div className="dropdown-container">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="dropdown-button"
            >
              {timeframe}
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {timeframeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setTimeframe(option);
                      setIsDropdownOpen(false);
                    }}
                    className="dropdown-option"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                    />
                  );
                }}
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
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
