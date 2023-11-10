"use client"
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import api from '../components/Services/api';

const Register = () => {
    const [usrNomUsr, setUsrNomUsr] = useState(''); 
    const [usrNome, setUsrNome] = useState('');
    const [ usrCpf, setUsrCpf] = useState('');
    const [usrEmail, setUsrEmail] = useState('');
    const [usrCelular, setUsrCelular] = useState('');
    const [usrTimTorce, setUsrTimTorce] = useState('');
    const [usrPraEsporte, setUsrPraEsporte] = useState('');
    const [usrEsporte, setUsrEsporte] = useState('');
    const [ usrPassword, setUsrPassword] = useState('');
    const [usrChvPix, setUsrChvPix] = useState('');

    const [atualiza, setAtualiza] = useState(0);
    
    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
          method: 'post',    
          url: `newuser`,
          data: {
            usrNomUsr: usrNomUsr, 
            usrNome: usrNome,
            usrCpf: usrCpf,
            usrEmail: usrEmail, 
            usrCelular: usrCelular, 
            usrTimTorce: usrTimTorce,
            usrPraEsporte: usrPraEsporte,
            usrEsporte: usrEsporte,
            usrPassword: usrPassword,
            usrChvPix: usrChvPix,
                  
          },
        }).then(function(response) {
            alert('Novo cadastrado com sucesso!')
        }).catch(function(error) {
          alert('Erro no cadastro!')
        })
    }

    return (
    <section className='h-screen gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Formulário Cadastro de Usuários
                      </h4>
                    </div>
                    <form>                       
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Nome de Usuário'
                          name='usrId'
                          value={usrNomUsr} 
                          onChange={(e) => {setUsrNomUsr(e.target.value)}} 
                        />
                      </div>                      
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Nome Completo'
                          name='usrNome'
                          value={usrNome} 
                          onChange={(e) => {setUsrNome(e.target.value)}} 
                        />
                      </div> 
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe CPF'
                          name='usrCpf'
                          value={usrCpf} 
                          onChange={(e) => {setUsrCpf(e.target.value)}} 
                        />
                      </div> 
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Email'
                          name='usrEmail'
                          value={usrEmail} 
                          onChange={(e) => {setUsrEmail(e.target.value)}} 
                        />
                      </div> 
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Celular'
                          name='usrCelular'
                          value={usrCelular} 
                          onChange={(e) => {setUsrCelular(e.target.value)}} 
                        />
                      </div> 
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Time do Coração'
                          name='usrTimTorce'
                          value={usrTimTorce} 
                          onChange={(e) => {setUsrTimTorce(e.target.value)}} 
                        />
                      </div> 
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Pratica algum Esporte'
                          name='usrPraEsporte'
                          value={usrPraEsporte} 
                          onChange={(e) => {setUsrPraEsporte(e.target.value)}} 
                        />
                      </div> 
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Qual Esporte você Pratica'
                          name='usrEsporte'
                          value={usrEsporte} 
                          onChange={(e) => {setUsrEsporte(e.target.value)}} 
                        />
                      </div> 
                      <div className='mb-4'>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Password'
                          name='usrPassword'
                          value={usrPassword} 
                          onChange={(e) => {setUsrPassword(e.target.value)}} 
                        />
                      </div> 
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Chave Pix'
                          name='usrChvPix'
                          value={usrChvPix} 
                          onChange={(e) => {setUsrChvPix(e.target.value)}} 
                        />
                      </div> 
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleCadastra}
                        >
                          Cadastrar
                        </button>
                      </div>                                        
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default Register;