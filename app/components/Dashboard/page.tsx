"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

import api from '../../components/Services/api';
import { FaBars } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import { FaUsersCog } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import moment from 'moment';
import Link from 'next/link';
import Pagination from '../../components/Pagination/Pagination';
import SliderShow from '../../components/SliderShow';

type ModServices = {
    "modId": number;
    "modDescricao": string;
}

type EquipesServices = {
    "equId": number; 
    "equDescricao": string; 
    "equModId": number;
    "equCorPadrao": string;
    "equStatus": string;
}

type EventosServices = {
    "eveId": number; 
    "eveDesc": string; 
}

type imgProps = {
    "base64File": string;
}

type ServicesProps = {
    "pagination": {
		"page": number;
		"per_page": number;
		"lastPage": number;
		"countUser": number;
		"offset": number
    }
    "movId": number; 
    "movEveId": number; 
    "movData": string;  
    "movHora": string;  
    "movEqu01": number;  
    "movPayout01": number;  
    "movVlrPay01": number;  
    "movEqu02": number;  
    "movPayout02": number;  
    "movVlrPay02": number;  
    "movEqu03": number;  
    "movPayout03": number;  
    "movVlrPay03": number;  
    "movVlrTotal": number;  
    "movVlrBet": number;  
    "movResult": number; 
}

interface filtros {
    "modalidade" ?: Array<number>;
    "evento" ?: Array<number>;
    "equipe" ?: Array<number>;
    "searchString" ?: string;
    "page" ?: number;
    "per_page" ?: number;
}

export default function Dashboard() {
    const [atualiza, setAtualiza] = useState(0);  
    const [modalidades, setModalidades] = useState<Array<ModServices>>([]);
    const [eventos, setEventos] = useState<Array<EventosServices>>([]);
    const [equipes, setEquipes] = useState<Array<EquipesServices>>([]);
    const [movimentos, setMovimentos] = useState<Array<ServicesProps>>([]);
    const { data: session} = useSession();

    const cor = '#D97706';
    
    const [openModal, setOpenModal] = useState(false)
    const [openModal2, setOpenModal2] = useState(false)

    const [showOptions, setShowOptions] = useState(false);

    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [pages, setPages] = useState(0);
    const [pagDefault, setPagDefault] = useState(0);
    const countPag = 0 as number;
    const perPageDefault = 12;
    const [newpage, setNewPage] = useState(0);

    const [clicked, setClicked] = useState(false);
    const handleToggle = () => {
        setClicked((prev) => !prev);
    };

    const [clickedEve, setClickedEve] = useState(false);
    const handleToggleEve = () => {
        setClickedEve((prev) => !prev);
    };

    const [clickedEqu, setClickedEqu] = useState(false);
    const handleToggleEqu = () => {
        setClickedEqu((prev) => !prev);
    };

    const router = useRouter();

    function handleSubmit(item: any) {
        const idUser = item.movId; 
        if (!session) {       
            router.push(`/Login`)
        }else {
            router.push(`/Aposta/${idUser}`)
        }    
    }

    const [ids, setIds] = useState<Array<number>>([]);
    const [idsMod, setIdsMod] = useState<Array<number>>([]);
    const [idsEve, setIdsEve] = useState<Array<number>>([]);
    const [idsEqu, setIdsEqu] = useState<Array<number>>([]);
    const [search, setSearch] = useState('');

    const testeJson:filtros = {
        modalidade: [],
        evento: [],
        equipe: [],        
        searchString: "",
        page: 1,
        per_page: 12
    }    

    useEffect(() => {   
        delete testeJson.modalidade;
        delete testeJson.evento;
        delete testeJson.equipe;        
        delete testeJson.searchString;
        delete testeJson.page;
        testeJson.page = 1;
        delete testeJson.per_page;
        testeJson.per_page = perPageDefault;

        //console.log(testeJson);

        api.post("/movimentos",{
            modalidade: testeJson.modalidade,
            evento: testeJson.evento,
            equipe: testeJson.equipe,
            searchString: testeJson.searchString, 
            page: testeJson.page, 
            per_page: testeJson.per_page
        }).then(response => {
            setMovimentos(response.data.movimentos)
            setPages(response.data.pagination.lastPage);          
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

        //axios({
        //    method: 'post',    
        //    url: 'https://backbet.vercel.app/movimentos',
        //    data: testeJson,
        //}).then(function(response) {
        //    setMovimentos(response.data.movimentos)
        //    setPages(response.data.pagination.lastPage);
        //}).catch(function(error) {
        //    console.log(error)
        //})

        api.get("/modalidades").then(res => {
            setModalidades(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });    

        api.get("/eventos").then(res => {
            setEventos(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        }); 
     
        api.get("/equipes").then(res => {
            setEquipes(res.data)           
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        }); 
        setAtualiza(1);      
    }, [])

    useEffect(() => {      
        if(atualiza === 1) {
            if (idsMod.length > 0 ) {
                testeJson.modalidade = [...idsMod]
            }else {
                delete testeJson.modalidade;
            }
            if (idsEve.length > 0 ) {
                testeJson.evento = [...idsEve]
            }else {
                delete testeJson.evento;
            } 
            if (idsEqu.length > 0 ) {
                testeJson.equipe = [...idsEqu]
            }else {
                delete testeJson.equipe;
            }        
            if (search !== "") {
                testeJson.searchString = search;
            }else {
                delete testeJson.searchString;                
            }
            let paramsData = JSON.stringify(testeJson);

            //setCurrentPage(1);
        
            delete testeJson.page;
            testeJson.page = 1;
            delete testeJson.per_page;
            testeJson.per_page = perPageDefault;

            console.log(testeJson);

            api.post("/movimentos",{
                modalidade: testeJson.modalidade,
                evento: testeJson.evento,
                equipe: testeJson.equipe,
                searchString: testeJson.searchString, 
                page: testeJson.page, 
                per_page: testeJson.per_page    
            }).then(response => {
                setMovimentos(response.data.movimentos)
                setPages(response.data.pagination.lastPage);          
            }).catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            }); 

            //axios({
            //   method: 'post',    
            //    url: 'https://backbet.vercel.app/movimentos',
            //    data: testeJson,
            //}).then(function(response) {
            //    setMovimentos(response.data.movimentos)
            //    setPages(response.data.pagination.lastPage) 
            //}).catch(function(error) {
            //    console.log(error)
            //})              
        }    
    }, [idsMod, idsEve, idsEqu, search])

    useEffect(() => {      
        if(newpage === 1) {
            if (idsMod.length > 0 ) {
                testeJson.modalidade = [...idsMod]
            }else {
                delete testeJson.modalidade;
            }
            if (idsEve.length > 0 ) {
                testeJson.evento = [...idsEve]
            }else {
                delete testeJson.evento;
            }
            if (idsEqu.length > 0 ) {
                testeJson.equipe = [...idsEqu]
            }else {
                delete testeJson.equipe;
            }
            if (search !== "") {
                testeJson.searchString = search;
            }else {
                delete testeJson.searchString;                
            }
            delete testeJson.page;
            testeJson.page = currentPage;
            delete testeJson.per_page;
            testeJson.per_page = perPageDefault;

            console.log('CurrentPage:',testeJson);
            
            api.post("/movimentos",{
                modalidade: testeJson.modalidade,
                evento: testeJson.evento,
                equipe: testeJson.equipe,
                searchString: testeJson.searchString, 
                page: testeJson.page, 
                per_page: testeJson.per_page    
            }).then(response => {
                setMovimentos(response.data.movimentos)
                setPages(response.data.pagination.lastPage);          
            }).catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            }); 

            //axios({
            //    method: 'post',    
            //    url: 'https://backbet.vercel.app/movimentos',
            //    data: testeJson,
            //}).then(function(response) {
            //    setMovimentos(response.data.movimentos)
            //}).catch(function(error) {
            //    console.log(error)
            //})              
        }    
    }, [currentPage ])


    const [filModalidades, setFilModalidades] = useState([]); 

    const selectModalidade = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = parseInt(event.target.value) as any;
        if (idsMod.includes(selectedId)) {
            const newIds = idsMod.filter((id:any) => id !== selectedId);
            setIds(newIds);
            setIdsMod(newIds);
            setFilModalidades(selectedId);
        } else {
            const newIds = [...idsMod];
            newIds.push(selectedId);
            setIds(newIds);      
            setIdsMod(newIds);
            setFilModalidades(selectedId);
        }
    };

    const [filEventos, setFilEventos] = useState([]); 

    const selectEvento = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    if (idsEve.includes(selectedId)) {
        const newIds = idsEve.filter((id) => id !== selectedId);
        setIds(newIds);
        setIdsEve(newIds);
    } else {
        const newIds = [...idsEve];
        newIds.push(selectedId);
        setIds(newIds);
        setIdsEve(newIds);
        }   
    };

    const [filEquipes, setFilEquipes] = useState([]); 

    const selectEquipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    if (idsEqu.includes(selectedId)) {
        const newIds = idsEqu.filter((id) => id !== selectedId);
        setIds(newIds);
        setIdsEqu(newIds);
    } else {
        const newIds = [...idsEqu];
        newIds.push(selectedId);
        setIds(newIds);
        setIdsEqu(newIds);
        }   
    };

    function handleSearch() {
        setAtualiza(1);
    }

    const [state, setState] = useState<imgProps>();

    function handleImage() {
        
        let lanId = '1';

        api.post("/authorize",{
            lanId: lanId,
        }).then(function(response) {
            setState({base64File: response.data.imagemQrcode});
            console.log(state)
        }).catch(function(error) {
            console.log(error)
        }); 

/*        axios({
            method: 'post',    
            url: `http://localhost:3333/authorize`,
            data: {
                lanId: lanId,
            }
        }).then(function(response) {
            setState({base64File: response.data.imagemQrcode});
            console.log(state)
        }).catch(function(error) {
            console.log(error)
        })    
*/

    }

    return (
        <div className="w-full h-full">
            <SliderShow />            
            <div className='flex flex-col md:flex-row w-full h-auto mt-5'>
                <div className='bg-slate-900 w-full md:w-[25%] h-auto z-10 md:ml-20'>
                    <span className="text-green-700 text-base font-semibold ml-3">
                        Filtro de Serviços
                    </span>
                    <div className='w-72 ml-3 mt-0 mb-3'>
                        <div>
                            <li className={`accordion_item ${clicked ? "active mb-2" : ""} list-none`}>
                                <button className="button p-2 text-green-700 font-bold text-left bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400 hover:cursor-pointertext-left flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg" onClick={handleToggle}>
                                    Modalidades
                                    <span className="control">{clicked ? "—" : "+"} </span>
                                </button>
                                <div className={`answer_wrapper ${clicked ? "active h-auto p-2 mb-5 bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400" : "hidden"}`}> 
                                    <div className={`answer ${clicked ? "active" : "hidden"}` }>
                                        <div className="h-auto">
                                            {modalidades.map((item) => (
                                            <div key={item.modId} className='flex flex-row justify-between items-center w-64'>
                                                <span className="text-sm font-semibold">{item.modDescricao}</span>
                                                <input
                                                    className="cursor-pointer"
                                                    type="checkbox"
                                                    value={item.modId}
                                                    onChange={selectModalidade}
                                                    checked={idsMod.includes(item.modId) ? true : false}
                                                />
                                            </div>
                                            ))}
                                        </div>  
                                    </div>
                                </div>
                            </li>                                
                        </div>
                    </div>
                    <div className='w-72 ml-3 mt-0 mb-3'>
                        <div>
                            <li className={`accordion_item ${clickedEve ? "active mb-2" : ""} list-none`}>
                                <button className="button p-2 text-green-700 font-bold text-left bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400 hover:cursor-pointertext-left flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg" onClick={handleToggleEve}>
                                    Eventos
                                    <span className="control">{clickedEve ? "—" : "+"} </span>
                                </button>
                                <div className={`answer_wrapper ${clickedEve ? "active h-auto p-2 mb-5 bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400" : "hidden"}`}> 
                                    <div className={`answer ${clickedEve ? "active" : "hidden"}` }>
                                        <div className="h-auto">
                                            {eventos.map((item) => (
                                            <div key={item.eveId} className='flex flex-row justify-between items-center w-64'>
                                                <span className="text-sm font-semibold">{item.eveDesc}</span>
                                                <input
                                                    className="cursor-pointer"
                                                    type="checkbox"
                                                    value={item.eveId}
                                                    onChange={selectEvento}
                                                    checked={idsEve.includes(item.eveId) ? true : false}
                                                />
                                            </div>
                                            ))}
                                        </div>  
                                    </div>
                                </div>
                            </li>                                
                        </div>
                    </div>
                    <div className='w-72 ml-3 mt-0 mb-3'>
                        <div>
                            <li className={`accordion_item ${clickedEqu ? "active mb-2" : ""} list-none`}>
                                <button className="button p-2 text-green-700 font-bold text-left bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400 hover:cursor-pointertext-left flex flex-wrap w-full justify-between items-center px-2 mt-6 shadow-lg" onClick={handleToggleEqu}>
                                    Equipes
                                    <span className="control">{clickedEqu ? "—" : "+"} </span>
                                </button>
                                <div className={`answer_wrapper ${clickedEqu ? "active h-auto p-2 mb-5 bg-gray-200 dark:bg-gray-800 border-l-2 border-gray-400" : "hidden"}`}> 
                                    <div className={`answer ${clickedEqu ? "active" : "hidden"}` }>
                                        <div className="h-auto">
                                            {equipes.map((item) => (
                                            <div key={item.equId} className='flex flex-row justify-between items-center w-64'>
                                                <span className="text-sm font-semibold">{item.equDescricao}</span>
                                                <input
                                                    className="cursor-pointer"
                                                    type="checkbox"
                                                    value={item.equId}
                                                    onChange={selectEquipe}
                                                    checked={idsEqu.includes(item.equId) ? true : false}
                                                />
                                            </div>
                                            ))}
                                        </div>  
                                    </div>
                                </div>
                            </li>                                
                        </div>
                    </div>                    
                </div>
                <div className='flex flex-col bg-slate-950 w-full md:w-[75%] h-auto md:mr-20'>
                    <div className='flex bg-slate-950 w-full h-auto '>
                        <div className='flex flex-row justify-between items-center w-full text-black p-2 bg-slate-950'> 
                            <div className='w-full h-auto mr-2 dark:bg-[#F3F3F3] '> 
                                <div className='flex flex-col w-full h-full text-black'>
                                    <div className="grid grid-cols-1 gap-1 md:grid-cols-5 md:gap-4 ml-1 px-0 py-0 ">            
                                    {movimentos?.map((item:any, idx) => {
                                    return <button key={idx} onClick={() => handleSubmit(item)}>                                                                               
                                        <div className='bg-sky-900 mt-1 mb-3 rounded overflow-hidden shadow-lg hover:bg-sky-700'> 
                                            <div className="text-sky-300 text-xs font-bold ml-2 mb-0">{item.eveDesc}</div>
                                            <div className="flex-row w-full justify-between mt-1 ">
                                                <span className="w-auto text-sky-300 text-xs font-semibold ml-2">
                                                    {moment(item.movData).utc().locale('pt-BR').format('ll')}
                                                </span>
                                                <span className="w-auto text-sky-300 text-xs font-semibold mb-0 ml-12">
                                                    {item.movHora}
                                                </span>
                                            </div>                                                                                                    
                                            <div className="flex flex-row items-start justify-between px-2 py-0 mt-1 ">
                                                <div className="flex flex-row items-start px-2 py-0">
                                                    <div className="text-white text-sm font-bold mb-0 mr-2">{item.timeA_desc}</div>
                                                </div>                                                 
                                                <div className="flex flex-col items-start px-1 py-0">
                                                    <span className="text-white text-sm font-bold mb-0">X</span>
                                                </div>                                                
                                                <div className="flex flex-row items-start px-2 py-0">
                                                    <div className="text-white text-sm font-bold mb-0">{item.timeC_desc}</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-start justify-between px-2 py-0 mt-1 ">
                                                <div className="flex flex-row items-start px-10 py-0">
                                                    <div className="text-white text-sm font-bold mb-0">{item.movResult01}</div>
                                                </div>
                                                <div className="flex flex-row items-start px-10 py-0">
                                                    <div className="text-white text-sm font-bold mb-0">{item.movResult03}</div>
                                                </div>
                                            </div>    
                                            <div className="flex flex-row items-start justify-between px-2 py-0 ">
                                                <div className="flex flex-col items-start px-2 py-1">
                                                    <div className="w-16 text-xs bg-slate-300 rounded-md font-bold mb-0">
                                                        {parseFloat(item.movPayout01).toFixed(2)}
                                                    </div>
                                                </div>  
                                                <div className="flex flex-col items-start px-2 py-1">
                                                    <div className="w-16 text-xs bg-slate-300 rounded-md font-bold mb-0">
                                                    {parseFloat(item.movPayout02).toFixed(2)}                                                      
                                                    </div>
                                                </div>  
                                                <div className="flex flex-col items-start px-2 py-1">
                                                    <div className="w-16 text-xs bg-slate-300 rounded-md font-bold mb-0">
                                                    {parseFloat(item.movPayout03).toFixed(2)}
                                                   </div>
                                                </div>    
                                            </div>                                            
                                        </div>                                                            
                                    </button>                  
                                    })}
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between items-center w-full text-black p-2 bg-gray-300 border-t-2 border-gray-200 '> 
                                    <div className='w-64 h-auto mr-5 md:w-80 md:mr-10 '>                                 
                                    </div>
                                    <div className='flex flex-row w-auto text-black p-2 bg-gray-300'>
                                        <Pagination pages={pages} setCurrentPage={setCurrentPage} setNewPage={setNewPage} pagInitial={pagDefault} /> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}