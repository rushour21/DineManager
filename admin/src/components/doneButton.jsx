import React from 'react'
import { PiSealCheckFill } from "react-icons/pi";

export default function DoneButton({backgroundColor, color}) {
  return (
    <div className='done-btn' style={{ backgroundColor, color }}><p>Order Done</p><PiSealCheckFill/></div>
  )
}
