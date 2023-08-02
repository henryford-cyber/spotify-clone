"use client";
import React from 'react'
import { useEffect, useState } from "react";
const Greeting = () => {
    const [currentTime, setCurrentTime] = useState<number>(0);

    const updateTime=()=>{
        const currentHour=new Date().getHours();  
        console.log(currentHour);
        setCurrentTime(currentHour);
    };
    useEffect(()=>{
        updateTime();
        const interval=setInterval(updateTime,60000);
        return ()=> clearInterval(interval);
    },[]);

  return (
    <div>
         {
                currentTime >= 18
                ? 'Chào buổi tối'
                : currentTime >= 12
                ? 'Chào buổi chiều'
                : 'Chào buổi sáng'
              }
    </div>
  )
}

export default Greeting