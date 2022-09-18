import Home from 'pages/Home'
import MenuItens from 'pages/menuItens'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from 'components/Menu'
import DefaultPage from 'components/DefaultPage'
import About from 'pages/about'
import Footer from 'components/Footer'
import NotFound from 'pages/NotFound'
import Prato from 'pages/Prato'

export default function AppRouter() {
   return (
      <main className='container'>
         <Router>
            <Menu />
            <Routes>
               <Route path='/' element={<DefaultPage />}>
                  <Route index element={<Home />} />
                  <Route path='cardapio' element={<MenuItens />} />
                  <Route path='sobre' element={<About />} />
               </Route>
               <Route path='*' element={<NotFound />} />
               <Route path='prato/:id' element={<Prato />} />
            </Routes>
            <Footer />
         </Router>
      </main>
   )
}