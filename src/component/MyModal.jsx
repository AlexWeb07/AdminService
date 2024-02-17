import React, { useEffect } from 'react'
import {useRef, useState } from 'react'


function MyModal(props) {
    const ref=useRef();
    const [open,setOpen]=useState(false)
    useEffect(()=>{
        setOpen(props.open)
    },[props.open])

    if(open) ref.current?.showModal()
    else ref.current?.close()
  return (
    <>
     {open && <div className='w-full h-full bg-slate-950/70 z-10 absolute top-0 left-0'></div>}
    <dialog ref={ref} className={`${props.bg} ${props.width} ${props.height || "h-[80%]"} rounded-xl`}>
    <button onClick={()=>{
        setOpen(false)
        props.setOpen(false)
    }} className="self-start m-2 font-semibold text-slate-400">✕</button>
        {props.children}
    </dialog>
      
    </>
  )
}

export default MyModal
