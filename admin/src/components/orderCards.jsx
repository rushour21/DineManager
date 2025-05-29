import React from 'react'
import { PiForkKnifeFill } from "react-icons/pi";
import '../styles/orderCards.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function OrderCards() {
  const [orderLine, setOrderLine] = useState([]);

  useEffect(() => {
    const fetchOrderLine = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orderline`);
        console.log("Order Line Data:", response.data);
        setOrderLine(response.data);
      } catch (error) {
        console.error("Error fetching order line:", error);
      }
    }
    fetchOrderLine();
  }, []);
console.log("Order Line State:", orderLine);

  const getOrdertitle = (order) => {
  const now = new Date();
  const createdTime = new Date(order.createdAt);
  const totalTime = order.totalTime || 0; // totalTime in minutes

  const readyTime = new Date(createdTime.getTime() + totalTime * 60000);
  const timeDiff = readyTime - now;
  const remainingTime = Math.max(0, Math.ceil(timeDiff / 60000)); // in minutes
  
  // Add 5 minutes for Takeaway pickup grace
  const takeawayDeadline = new Date(readyTime.getTime() + 5 * 60000);

  if (now >= readyTime) {
    return {
      title: 'Done',
      backgroundColor: '#B9F8C9', // green
      titleColor: '#34C759',
      timetext : "Served",
    };
  } else if (order.orderType === 'TAKEAWAY') {
    return {
      title: 'Takeaway',
      titleColor: '#3181A3',
      backgroundColor: '#C2D4D9', // blue
      timetext: now > takeawayDeadline
      ? "Not picked yet"
      : `Ongoing: ${remainingTime} mins`
    };
  } else if (order.orderType === 'DINE_IN') {
    return {
      title: 'Dine In',
      titleColor: '#FF9500',
      backgroundColor: '#FFE3BC', // orange
      timetext: `Ongoing: ${remainingTime} mins`
    };
  } else {
    return {
      title: 'Unknown',
      backgroundColor: '#white',
      timetext: ""
    };
  }
};


  return (
    <div className='order-cards'>
      <div className='title-order'>
        <h2>Order Line</h2>
      </div>
      <div className='order-content'>
          {orderLine.map((order, index) => {
            const orderTitle = getOrdertitle(order)
            return (
            <div className='order-card' key={order._id} style={{backgroundColor: orderTitle.backgroundColor}}>
              <div className='card-a'>
                <div className='order-number'>
                  <PiForkKnifeFill color='#007AFF'/>
                  <p>#{100 + (index + 1)}</p>
                </div>
                <div className='table-time' style={{fontSize: '8px'}}>
                  <p>Table {order.tableNumber}</p>
                  <p>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <p style={{fontSize: '12px'}} className='item-number'>{order.items.length}&nbsp;&nbsp;Items</p>
              <div className='abs-div' style={{backgroundColor: orderTitle.backgroundColor}}> 
                <p style={{color:orderTitle? orderTitle.titleColor : "#FF9500", fontSize: "12px"}}>{orderTitle.title}</p>
                <p style={{fontSize: "7px"}}>{orderTitle.timetext}</p>
              </div>
            </div>
            <div className='card-b'>
              <div className='item-name-1'><span>1x</span><p>Value Set Meals</p></div>
              <div className='item-name-o'>
                  {order.items.map((item, idx) => {
                    return (
                      <div key={idx} className='item-name-2'>
                        <span>{item.quantity}x</span>
                        <p>{item.itemName}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className='card-status'>{order.status}</div>
          </div>)})}
      </div>
    </div>
  )
}
