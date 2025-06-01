import React from 'react'
import { PiForkKnifeFill } from "react-icons/pi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import DoneButton from './doneButton';
import ProcessingButton from './processingButton';
import '../styles/orderCards.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function OrderCards() {
  const [orderLine, setOrderLine] = useState([]); 
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track open dropdown

  const toggleDropdown = (id) => {
  setDropdownOpen(dropdownOpen === id ? null : id);
};
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

  const handleMarkAsPicked = async (orderId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/orderline/pickup/${orderId}`);
      if(response.status===200){
      // refetch or optimistically update UI
      setOrderLine(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: "PICKED_UP" } : order
        )
      );
      }
      setDropdownOpen(null);
    } catch (err) {
      console.error("Error marking as picked up", err);
    }
  };


  const getOrdertitle = (order) => {
    const now = new Date();
    const createdTime = new Date(order.createdAt);
    const totalTime = order.totalTime || 0; // totalTime in minutes

    const readyTime = new Date(createdTime.getTime() + totalTime * 60000);
    const timeDiff = readyTime - now;
    const remainingTime = Math.max(0, Math.ceil(timeDiff / 60000)); // in minutes
    

    if (order.status === "ORDER_DONE" && order.orderType === "DINE_IN") {
      return {
        title: 'Done',
        backgroundColor: '#B9F8C9', // green
        titleColor: '#34C759',
        timetext : "Served",
      };
    } else if(order.status === "PICKED_UP"){
        return {
          title: 'Takeaway',
          titleColor: '#3181A3',
          backgroundColor: '#C2D4D9', // blue
          timetext: "Picked up"
        }
    }else if (order.orderType === 'TAKEAWAY') {
      return {
        title: 'Takeaway',
        titleColor: '#3181A3',
        backgroundColor: '#C2D4D9', // blue
        timetext: order.status === "NOT_PICKED_UP"
        ? "Not picked yet"
        : `Ongoing: ${remainingTime} mins`
      };
    }
    else if (order.orderType === 'DINE_IN') {
      return {
        title: 'Dine In',
        titleColor: '#FF9500',
        backgroundColor: '#FFE3BC', // orange
        timetext: `Ongoing: ${remainingTime} mins`
      };
    } else {
      return {
        title: 'Dine In',
        titleColor: '#FF9500',
        backgroundColor: '#FFE3BC', // orange
        timetext: ""
      };
    }
  };
  const getStatus= (order) =>{
    if(order.status === "PREPARING" && order.orderType === "DINE_IN"){
      return <ProcessingButton backgroundColor="#FDC474" color="#D87300"/>;
    }
    if(order.status === "ORDER_DONE" && order.orderType === "DINE_IN"){
      return <DoneButton backgroundColor="#31FF65" color="#0E912F"/>;
    }
    if(order.status === "PREPARING" && order.orderType === "TAKEAWAY"){
      return <ProcessingButton backgroundColor="#9BAEB3" color="#3B413D"/>
    }
    if(order.status === "NOT_PICKED_UP" || order.status === "PICKED_UP" && order.orderType === "TAKEAWAY"){
      return <DoneButton backgroundColor="#9BAEB3" color="#3B413D"/>
    }
  }


  return (
    <div className='order-cards'>
      <div className='title-order'>
      <p style={{color:"#565656", fontSize: '20px', fontWeight:"600"}}>Order Line</p>
      </div>
      <div className='order-content'>
          {orderLine.map((order, index) => {
            const orderTitle = getOrdertitle(order)
            const orderStatus = getStatus(order)
            return (
            <div className='order-card' key={order._id} style={{backgroundColor: orderTitle.backgroundColor}}>
              <div className='card-a'>
                <div className='order-number'>
                  <PiForkKnifeFill color='#007AFF'/>
                  <p>#{100 + (index + 1)}</p>
                </div>
                <div className='table-time' style={{fontSize: '8px'}}>
                  {order.orderType === "DINE_IN" ? <p>Table {order.tableNumber}</p> : <p></p> }
                  <p>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <p style={{fontSize: '12px'}} className='item-number'>{order.items.length}&nbsp;&nbsp;Items</p>
              <div className='abs-div' style={{backgroundColor: orderTitle.backgroundColor}}> 
                <p style={{color:orderTitle? orderTitle.titleColor : "#FF9500", fontSize: "12px"}}>{orderTitle.title}</p>
                <p style={{fontSize: "7px"}}>{orderTitle.timetext}</p>
                {order.status === "NOT_PICKED_UP" &&(
                  <span className='drop-icon' onClick={() => toggleDropdown(order._id)} style={{ cursor: "pointer" }}>
                    {dropdownOpen === order._id ? <MdArrowDropUp /> : <MdArrowDropDown />}</span>)}
                  
                  {dropdownOpen === order._id && (
                      <button className="pickup-dropdown" onClick={()=>handleMarkAsPicked(order._id)}>Picked Up</button>
                  )}
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
            <div className='card-status'>{orderStatus}</div>
          </div>)})}
      </div>
    </div>
  )
}
