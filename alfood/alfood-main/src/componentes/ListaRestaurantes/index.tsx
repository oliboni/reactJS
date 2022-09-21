import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { IPaginacao } from '../../interfaces/IPaginacao'
import IRestaurante from '../../interfaces/IRestaurante'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import http from '../../http'
import axios from 'axios'

const ListaRestaurantes = () => {
   const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
   const [proximaPagina, setProximaPagina] = useState('')
   const [buscar, setBuscar] = useState('')
   const [lista, setLista] = useState<IRestaurante[]>(restaurantes)
   // const [paginaAnterior, setPaginaAnterior] = useState('')

   useEffect(() => {
      http
         .get<IPaginacao<IRestaurante>>('/api/v1/restaurantes/')
         .then((resposta) => {
            setRestaurantes(resposta.data.results)
            setProximaPagina(resposta.data.next)
         })
         .catch((err) => {
            console.log(err)
         })
   }, [])

   const verMais = () => {
      axios
         .get<IPaginacao<IRestaurante>>(proximaPagina)
         .then((resposta) => {
            setRestaurantes([...restaurantes, ...resposta.data.results])
            setProximaPagina(resposta.data.next)
         })
         .catch((err) => {
            console.log(err)
         })
   }

   // ###Usando dois botões como próximo e anterior
   /*const getRestaurantes = (url: string) => {
      axios
         .get<IPaginacao<IRestaurante>>(url)
         .then((resposta) => {
            setRestaurantes(resposta.data.results)
            setProximaPagina(resposta.data.next)
            setPaginaAnterior(resposta.data.previous)
         })
         .catch((err) => {
            console.log(err)
         })
   }*/

   function testFind(nome: string) {
      const regex = new RegExp(buscar, 'i')

      return regex.test(nome)
   }

   useEffect(() => {
      const novaLista = restaurantes.filter((item) => testFind(item.nome))
      setLista(novaLista)
   }, [buscar, restaurantes])

   return (
      <section className={style.ListaRestaurantes}>
         <div className={style.ListaRestaurantes__filter}>
            <h1>
               Os restaurantes mais <em>bacanas</em>!
            </h1>
            <TextField
               label='Buscar'
               variant='filled'
               onChange={(event) => setBuscar(event.target.value)}
            />
         </div>
         {lista?.map((item) => (
            <Restaurante restaurante={item} key={item.id} />
         ))}
         {proximaPagina && <button onClick={verMais}>Ver Mais</button>}
         {/* <button
            onClick={() => getRestaurantes(paginaAnterior)}
            disabled={!paginaAnterior}>
            Página Anterior
         </button>
         <button
            onClick={() => getRestaurantes(proximaPagina)}
            disabled={!proximaPagina}>
            Próxima Página
         </button> */}
      </section>
   )
}

export default ListaRestaurantes
