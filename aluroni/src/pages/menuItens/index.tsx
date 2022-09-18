import styles from './Menu.module.scss'
import stylesTheme from 'styles/Theme.module.scss'
import Finder from './Finder'
import { useState } from 'react'
import Filters from './Filters'
import Ordenador from './Ordenador'
import Itens from './Itens'

export default function Menu() {
   const [find, setFind] = useState('')
   const [filter, setFilter] = useState<number | null>(null)
   const [ordenador, setOrdenador] = useState('')

   return (
      <section className={styles.cardapio}>
         <h3 className={stylesTheme.titulo}>Cardápio</h3>
         <Finder find={find} setFind={setFind} />
         <div className={styles.cardapio__filtros}>
            <Filters filter={filter} setFilter={setFilter} />
            <Ordenador ordenador={ordenador} setOrdenador={setOrdenador} />
         </div>
         <Itens find={find} filter={filter} ordenador={ordenador} />
      </section>
   )
}
