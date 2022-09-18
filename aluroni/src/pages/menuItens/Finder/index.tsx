import React from 'react'
import styles from './Finder.module.scss'
import { CgSearch } from 'react-icons/cg'

interface Props {
   find: string;
   setFind: React.Dispatch<React.SetStateAction<string>>;
}

export default function Finder({ find, setFind }: Props) {
   return (
      <div className={styles.buscador}>
         <input
            value={find}
            onChange={(event) => setFind(event.target.value)}
            placeholder="Buscar"
         />
         <CgSearch size={20} color="#4C4D5E" />
      </div>
   )
}
