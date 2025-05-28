import React from 'react'
import { PiForkKnifeFill } from "react-icons/pi";

import '../styles/orderCards.css';

export default function OrderCards() {
  return (
    <div className='order-cards'>
      <div className='title-order'>
        <h2>Order Line</h2>
      </div>
      <div className='order-content'>
          <div className='order-card'>
            <div className='card-a'>
              <div className='order-number'>
                <PiForkKnifeFill color='#007AFF'/>
                <p>#1234</p>
              </div>
              <div className='table-time' style={{fontSize: '9px'}}>
                <p>Table 5</p>
                <p>12:30 PM</p>
              </div>
              <p style={{fontSize: '12px'}} className='item-number'>Items: 3</p>
              <div className='abs-div'>
                <p></p>
                <p></p>
              </div>
            </div>
            <div className='card-b'>
              <div className='item-name-1'><span>1x</span><p>Value Set Meals</p></div>
              <div className='item-name'></div>
            </div>
            <div className='card-status'></div>
          </div>
      </div>
    </div>
  )
}
