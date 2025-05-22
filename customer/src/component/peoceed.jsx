import React from 'react'
import { useState } from 'react';
import { TbXboxXFilled } from "react-icons/tb";

export default function Proceed({ selectedItems, addItem, decreaseItem, goBack }) {
  console.log(selectedItems)
  const [orderType, setOrderType] = useState('DINE_IN');
  const taxes= 5;
  const deliveryCharge = 50;
  return (
    <div className='proceed'>
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
            <p className='instr'>Add cooking instructions (optional)</p>
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
          <p>Item Total</p>
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
    </div>
  )
}
