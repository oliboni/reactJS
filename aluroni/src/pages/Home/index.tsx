import menu from 'data/menu.json'
import styles from './Home.module.scss'
import stylesTheme from 'styles/Theme.module.scss'
import nossaCasa from 'assets/nossa_casa.png'
import { useNavigate } from 'react-router-dom'
import { Prato } from 'types/Prato'

export default function Home() {
   let recomended = [...menu]
   recomended = recomended.sort(() => 0.5 - Math.random()).slice(0,3)
   const navigate = useNavigate()

   function redirectToDatails(prato: Prato) {
      navigate(`/prato/${prato.id}`, {state: {prato}})
   }

   return (
      <section>
         <h3 className={stylesTheme.titulo}>
            Recomendações da cozinha
         </h3>
         <div className={styles.recomendados}>
            {recomended.map(item => (
               <div key={item.id} className={styles.recomendado}>
                  <div className={styles.recomendado__imagem}> 
                     <img src={item.photo} alt={item.title}/>
                  </div>
                  <button 
                     className={styles.recomendado__botao}
                     onClick={() => redirectToDatails(item)}
                  >
                     Ver mais
                  </button>
               </div>
            ))}
         </div>
         <h3 className={stylesTheme.titulo}>Nossa casa</h3>
         <div className={styles.nossaCasa}>
            <img src={nossaCasa} alt='Casa do Aluroni'/>
            <div className={styles.nossaCasa__endereco}>
               Av. Getulio Vargas, 8274 <br/> <br/> Centro - chapecó
            </div>
         </div> 
      </section>
   )
}
