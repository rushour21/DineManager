import React from 'react'
import { useState } from 'react';
import { TbXboxXFilled } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import Swiper from "./swiper.jsx"
import "../styles/proceed.css"; 


export default function Proceed({ selectedItems, addItem, decreaseItem }) {
  console.log(selectedItems)
  const [orderType, setOrderType] = useState('DINE_IN');
  const [customername, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState(null);
  const [instructions, setInstructions] = useState('');
  const taxes= 5;
  const deliveryCharge = orderType === 'DINE_IN' ? 0 : 50;
  const totalPrepTime = selectedItems.reduce(
    (total, item) => total + item.requiredTime * item.quantity,
    0
  );
  const handlemodal = (itemId) => {
    setActiveItemId(itemId);
    setInstructions(selectedItems.find(item => item._id === itemId).instructions);
    setModalOpen(true);
  }
  const playload ={
    customerName: customername,
    mobile: customerMobile,
    items: selectedItems.map(item => ({
        itemId: item._id,
        instructions: item.instructions,
        quantity: item.quantity
      })),
    orderType: orderType,
    totalAmount: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
    taxes: taxes * selectedItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100,
    deliveryCharge: deliveryCharge,
    deliveryAddress: customerAddress,
    grandTotal: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0) + deliveryCharge + (taxes * selectedItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100)
  }
  const handleNext = () => {}
  return (
    <><div className={`proceed ${modalOpen ? 'blurred' : ''}`}>
      <div className='proceed-items'>
        {selectedItems.map((item, index) => (
          <div key={index} className='proceed-item'>
            <div className='item-details'>
              <div 
                className='item-image' 
                style={{
                  width: '120px', 
                  boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.17)',
                  borderRadius: '8px',
                  height: '100px', backgroundImage: `url(${item.imageUrl})`}}
              ></div>
              <div className='item-info'>
                <p style={{ fontSize: "16px", fontWeight:'500', width: '200px', marginBottom: '5px'}}>{item.name}</p>
                <p className='item-price'>₹ {item.price}</p>
                <div className='quantity-controls-1'>
                  <button 
                    className='btn'
                    onClick={() => decreaseItem(item._id)}
                  >
                    -
                  </button>
                  <span className='quantity'>{item.quantity}</span>
                  <button 
                    className='btn'
                    onClick={() => addItem(item._id)}
                  >
                    +
                  </button>
                  <div className='remove-item'>
                    <TbXboxXFilled size={22} color='#E04444'/>
                  </div>
                </div>
              </div>
            </div>
            <p onClick={handlemodal} className='instr'>Add cooking instructions (optional)</p>
          </div>
        ))}
      </div>
      <div className='order-type'>
        <button style={{ backgroundColor: orderType === 'DINE_IN' ? 'white' : 'transparent', color: "ffffff" }} onClick={() => setOrderType('DINE_IN')}>Dine In</button>
        <button style={{ backgroundColor: orderType === 'TAKEAWAY' ? 'white' : 'transparent', color: "ffffff" }} onClick={() => setOrderType('TAKEAWAY')}>TakeAway</button>
      </div>
      <div className='order-details'>
        <div className='order-price'>
          <p>Item Total</p>
          <p>₹ {selectedItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
        </div>
         <div className='order-price'>
          <p className='del-ch'>Delivery Charge</p>
          <p>₹ {deliveryCharge}</p>
        </div>
         <div className='order-price'>
          <p>Taxes</p>
          <p>₹ {taxes * selectedItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100}</p>
        </div>
        <div className='grand-total'>
          <p>Grand Total</p>
          <p>₹ {selectedItems.reduce((total, item) => total + item.price * item.quantity, 0) + deliveryCharge + (taxes * selectedItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100)}</p>
        </div>
      </div>
      <div className='cust-details'>
        <p>Your Details</p>
        <div className='cust-details-input'>
          <input className='details-input' value={customername} onChange={(e) => setCustomerName(e.target.value)} type="text" placeholder='Name'/>
          <span>,</span>
          <input className='details-input' value={customerMobile} onChange={(e) => setCustomerMobile(e.target.value)} type="text" placeholder='Mobile'/>
        </div>
      </div>
      <div className='more-details'>
        <div className='m-d-i'>
          <FaMapMarkerAlt color='#4AB425' /> 
          <p>
            Delevery at Home - 
            <input className='details-input' 
            value={customerAddress} 
            onChange={(e) => setCustomerAddress(e.target.value)} 
            type="text" placeholder='Address'/>
          </p>
        </div>
        <div className='m-d-i'><FaClock color='#4AB425'/> <p>Delevery in {totalPrepTime} min</p></div>
      </div>
      <div className='proceed-btn'>
        <Swiper/>
      </div>  
    </div>
    {modalOpen && (
          <div className='modal'>
            <button className='close-btn' onClick={() => setModalOpen(false)}><RiCloseLargeFill size={22}/></button>
            <div className='modal-1'>
              <div className='modal-content'>
                <p style={{ fontSize: '18px', fontWeight: '500' }} >Add Cooking instructions </p>
                <div className='text-area-container'>
                  <textarea className='text-t'
                    value={instructions} 
                    onChange={(e) => setInstructions(e.target.value)}>
                  </textarea>
                </div>
                <p style={{ fontSize: '12px', color: '#8C7B7B' }}>The restaurant will try its best to follow your
                  request. However, refunds or cancellations in this regard won’t be possible</p>
              </div>
              <div className='modal-btns'>
                <button className='btn-m' onClick={() => setModalOpen(false)} style={{ backgroundColor: '#F0F5F3', color:'#505050'}}>Cancel</button>
                <button className='btn-m' onClick={handleNext} style={{backgroundColor: '#505050', color: 'white'}}>Next</button>
              </div>
            </div>
         </div>
        )}
    </>
  )
}
