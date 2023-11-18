'use client'
import Image from 'next/image'
import React from 'react'

import img1 from '../../public/img_1.jpg';

export default function SliderShow() {
    return (
        <div className="flex flex-col bg-slate-400 w-screen h-3/4 justify-center items-center">
            <div className='w-full h-full '>
               <Image src={img1} alt=" " className='mt-10'/>
            </div>       
        </div>
    )
}