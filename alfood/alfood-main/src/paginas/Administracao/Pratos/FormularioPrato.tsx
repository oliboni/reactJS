import {
   Button,
   Container,
   Paper,
   TextField,
   Typography,
   Box,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
} from '@mui/material'
import http from '../../../http'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ITag from 'interfaces/ITag'
import IRestaurante from 'interfaces/IRestaurante'
import IPrato from 'interfaces/IPrato'

export default function FormularioPrato() {
   const params = useParams()
   const [nomePrato, setNomePrato] = useState('')
   const [descricao, setDescricacao] = useState('')
   const navigate = useNavigate()
   const [tag, setTag] = useState('')
   const [restaurante, setRestaurante] = useState('')
   const [imagem, setImagem] = useState<File | null>(null)

   const [tags, setTags] = useState<ITag[]>([])
   const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

   useEffect(() => {
      http
         .get<{ tags: ITag[] }>('api/v2/tags/')
         .then((resposta) => setTags(resposta.data.tags))

      http
         .get<IRestaurante[]>('api/v2/restaurantes/')
         .then((resposta) => setRestaurantes(resposta.data))
   }, [])

   useEffect(() => {
      if (params.id) {
         http
            .get<IPrato>(`/api/v2/pratos/${params.id}/`)
            .then((resposta) => {
               setNomePrato(resposta.data.nome)
               setDescricacao(resposta.data.descricao)
               setTag(resposta.data.tag)
               // setRestaurante(restaurantes.find(item => {item.id === resposta.data.restaurante})?.nome | '')
            })
            .catch((err) => console.log(err))
      }
   }, [params])

   const selectionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
      if (evento.target.files?.length) {
         setImagem(evento.target.files[0])
      } else {
         setImagem(null)
      }
   }

   const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault()

      const formData = new FormData()

      formData.append('nome', nomePrato)
      formData.append('descricao', descricao)
      formData.append('tag', tag)
      formData.append('restaurante', restaurante)
      if (imagem) {
         formData.append('imagem', imagem)
      }

      http
         .request({
            url: params.id ? `api/v2/pratos/${params.id}/` : 'api/v2/pratos/',
            method: params.id ? 'PATCH' : 'POST',
            headers: {
               'Content-Type': 'multipart/form-data',
            },
            data: formData,
         })
         .then((responst) => {
            alert('Prato cadastrado com sucesso')
            navigate(-1)
         })
         .catch((erro) => console.log(erro))
   }

   return (
      <Box>
         <Container maxWidth='lg' sx={{ mt: 1 }}>
            <Paper sx={{ p: 2 }}>
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     flexGrow: 1,
                  }}>
                  <Typography component='h1' variant='h6'>
                     Formulário de Pratos
                  </Typography>
                  <Box
                     component='form'
                     onSubmit={aoSubmeterForm}
                     sx={{ width: '100%' }}>
                     <TextField
                        value={nomePrato}
                        onChange={(evento) => setNomePrato(evento.target.value)}
                        label='Nome'
                        variant='standard'
                        fullWidth
                        required
                        margin='dense'
                     />
                     <TextField
                        value={descricao}
                        onChange={(evento) =>
                           setDescricacao(evento.target.value)
                        }
                        label='Descrição'
                        variant='standard'
                        fullWidth
                        required
                        margin='dense'
                     />

                     <FormControl margin='dense' fullWidth>
                        <InputLabel id='select-tag'>Tag</InputLabel>
                        <Select
                           labelId='select-tag'
                           value={tag}
                           onChange={(evento) => setTag(evento.target.value)}>
                           {tags.map((tag) => (
                              <MenuItem value={tag.value} key={tag.id}>
                                 {tag.value}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>

                     <FormControl margin='dense' fullWidth>
                        <InputLabel id='select-restaurante'>
                           Restaurante
                        </InputLabel>
                        <Select
                           labelId='select-restaurante'
                           value={restaurante}
                           onChange={(evento) =>
                              setRestaurante(evento.target.value)
                           }>
                           {restaurantes.map((restaurante) => (
                              <MenuItem
                                 value={restaurante.id}
                                 key={restaurante.id}>
                                 {restaurante.nome}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>

                     <input type='file' onChange={selectionarArquivo} />
                     <Button
                        sx={{ marginTop: 1 }}
                        type='submit'
                        variant='outlined'
                        fullWidth>
                        Salvar
                     </Button>
                  </Box>
               </Box>
            </Paper>
         </Container>
      </Box>
   )
}
