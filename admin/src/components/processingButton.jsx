import React from 'react'
import { MdHourglassBottom } from "react-icons/md";


export default function ProcessingButton({backgroundColor, color}) {
    console.log(backgroundColor, color);
  return (
    <div className='proce-btn' style={{ backgroundColor, color }}><p>Processing</p><MdHourglassBottom/></div>
  )
}
