import React, { useEffect, useState } from 'react'
import ChefTable from './analyticsComponent/chefTable.jsx'
import { PiBowlFood } from "react-icons/pi";
import { MdCurrencyRupee } from "react-icons/md";
import { LuSquareUser } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import axios from 'axios';
import '../styles/analytics.css';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch analytics data');
        }
        setAnalyticsData(response.data);
        console.log('Analytics Data:', response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };
    fetchData();
  }, []);
  console.log('Analytics Data State:', analyticsData);
  const totalChefs = analyticsData.totalChefs ? analyticsData.totalChefs.length : 0;
  const totalRevenue = analyticsData.totalRevenue ?? 0;
  const totalOrders = analyticsData.totalOrders ?? 0;
  const totalCustomers = analyticsData.totalCustomers ?? 0;
  console.log('Total Chefs:', totalChefs);
  console.log('Total Revenue:', totalRevenue);


  function formatNumber(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}
  return (
    <div className='analytics'>
      <div className='searchbar-analytics'>
        <div className='block-a'></div>
        <input type="text" placeholder='Search' />
      </div>
      <div className='analytics-content'>
        <h2 style={{fontSize: '20px'}}>Analytics</h2>
        <div className='analytics-a'>
          <div className='info-block'>
            <div className='icon-block-a'><PiBowlFood /></div>
            <div className='block-details'>
              <h3>{totalChefs.toString().padStart(2, '0')}</h3>
              <p>TOTAL CHEFS</p>
            </div>
          </div>
          <div className='info-block'>
            <div className='icon-block-a'><MdCurrencyRupee/></div>
            <div className='block-details'>
              <h3>{formatNumber(totalRevenue)}</h3>
              <p>TOTAL REVENUE</p>
            </div>
          </div>
          <div className='info-block'>
            <div className='icon-block-a'><LuSquareUser/></div>
            <div className='block-details'>
              <h3>{totalOrders.toString().padStart(2, '0')}</h3>
              <p>TOTAL ORDERS</p>
            </div>
          </div>
          <div className='info-block'>
            <div className='icon-block-a'><HiOutlineUsers/></div>
            <div className='block-details'>
              <h3>{totalCustomers.toString().padStart(2, '0')}</h3>
              <p>TOTAL CLIENTS</p>
            </div>
          </div>
        </div>
        <div className='analytics-b'>
          <div className='analytics-chart-a'></div>
          <div className='analytics-chart-a'></div>
          <div className='analytics-chart-a'></div>
        </div>
        <div className='chefs'>
          <ChefTable chefData={analyticsData.totalChefs} />
        </div>
      </div>
    </div>
  )
}
