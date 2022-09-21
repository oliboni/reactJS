import {
   Button,
   Container,
   Paper,
   TextField,
   Typography,
   Box,
} from '@mui/material'
import IRestaurante from 'interfaces/IRestaurante'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../../../http'

export default function FormularioRestaurante() {
   const params = useParams()
   const [nomeRestaurante, setNomeRestaurante] = useState('')
   const navigate = useNavigate()

   useEffect(() => {
      if (params.id) {
         http
            .get<IRestaurante>(`/api/v2/restaurantes/${params.id}/`)
            .then((resposta) => {
               setNomeRestaurante(resposta.data.nome)
            })
            .catch((err) => console.log(err))
      }
   }, [params])

   const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault()

      if (params.id) {
         http
            .put(`/api/v2/restaurantes/${params.id}/`, {
               nome: nomeRestaurante,
            })
            .then(() => {
               alert('Restaurante atualziado com sucesso')
               navigate(-1)
            })
      } else {
         http
            .post('/api/v2/restaurantes/', {
               nome: nomeRestaurante,
            })
            .then(() => {
               alert('Restaurante cadastrado com sucesso')
               navigate(-1)
            })
      }
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
                     Formulário de restaurantes
                  </Typography>
                  <Box
                     component='form'
                     onSubmit={aoSubmeterForm}
                     sx={{ width: '100%' }}>
                     <TextField
                        value={nomeRestaurante}
                        onChange={(evento) =>
                           setNomeRestaurante(evento.target.value)
                        }
                        label='Nome do Restaurante'
                        variant='standard'
                        fullWidth
                        required
                     />
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
