import menu from 'data/menu.json'
import Item from './Item'
import styles from './Itens.module.scss'
import { useEffect, useState } from 'react'
import { Menu, Prato } from 'types/Prato'

interface Props {
   find: string;
   filter: number | null;
   ordenador: string
}

export default function Itens(props: Props) {
   const [list, setList] = useState(menu)
   const { find, filter, ordenador } = props

   function testFind(title: string) {
      const regex = new RegExp(find, 'i')

      return regex.test(title)
   }

   function testFilter(categoryId: number) {
      if (filter !== null) return filter === categoryId
      return true
   }

   const ordenarPropriedadeCrescente = (
      list: Menu,
      propertie: keyof Pick<Prato, 'size' | 'serving' | 'price'>
   ) => {
      return list.sort((a, b) => (a[propertie] > b[propertie] ? 1 : -1))
   }

   function ordenar(newList: Menu) {
      switch (ordenador) {
      case 'porcao':
         return ordenarPropriedadeCrescente(newList, 'size')
      case 'qtd_pessoas':
         return ordenarPropriedadeCrescente(newList, 'serving')
      case 'preco':
         return ordenarPropriedadeCrescente(newList, 'price')
      default:
         return newList
      }
   }

   useEffect(() => {
      const newList = menu.filter(
         (item) => testFind(item.title) && testFilter(item.category.id)
      )
      setList(ordenar(newList))
   }, [find, filter, ordenador])

   return (
      <div className={styles.itens}>
         {list.map((item) => (
            <Item key={item.id} {...item} />
         ))}
      </div>
   )
}
