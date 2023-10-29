"use client"
import { useState, useEffect } from "react"

import api from '../components/Services/api'

export default function Modalidades() {
    const [modalidades, setModalidades] = useState([]);

    useEffect(() => {   
            
        api.get("/modalidades").then(res => {
            setModalidades(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

    }, [])

    return (
        <div className="grid grid-cols-1 gap-1 md:grid-cols-10 md:gap-4 ml-1 px-0 py-0 ">           
            {modalidades?.map((item:any, idx) => {
                return <button key={idx} >
                    <div className="flex flex-col items-center justify-center w-40 h-28 bg-blue-900 gap-4 ">
                        <h1 className="text-3xl text-white font-bold ">{item.modDescricao}</h1>
                    </div>
                </button> 
            })}            
        </div>    
    )
}