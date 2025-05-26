import React from 'react'
import '../styles/analytics.css';

export default function Analytics() {
  return (
    <div className='analytics'>
      <div className='searchbar-analytics'>
        <div className='block-a'></div>
        <input type="text" placeholder='Search' />
      </div>
      <div className='analytics-content'>
        <div className='analytics-a'>
          <div className='info-block'>
            <div></div>
            <div>
              <p></p>
              <p>TOTAL CHEFS</p>
            </div>
          </div>
          <div className='info-block'>
            <div></div>
            <div>
              <p></p>
              <p>TOTAL REVENU</p>
            </div>
          </div>
          <div className='info-block'>
            <div></div>
            <div>
              <p></p>
              <p>TOTAL ORDERS</p>
            </div>
          </div>
          <div className='info-block'>
            <div></div>
            <div>
              <p></p>
              <p>TOTAL CLIENTS</p>
            </div>
          </div>
        </div>
        <div className='analytics-b'></div>
        <div className='chefs'></div>
      </div>
    </div>
  )
}
