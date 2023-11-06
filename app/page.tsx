"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import SliderShow from './components/SliderShow';
import Dashboard from './components/Dashboard/page';

export default function Home() {
    const cor = '#D97706';
    
    const router = useRouter();

    return (
        <div className="flex ">
            <SliderShow />            
            <Dashboard />        
        </div>
    )
}