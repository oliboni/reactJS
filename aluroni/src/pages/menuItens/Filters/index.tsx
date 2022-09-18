import styles from './Filter.module.scss'
import filters from './filters.json'
import classNames from 'classnames'

type IOption = typeof filters[0];
interface Props {
   filter: number | null;
   setFilter: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Filters({ filter, setFilter }: Props) {
   function selectFilter(option: IOption) {
      if (filter === option.id) return setFilter(null)
      return setFilter(option.id)
   }

   return (
      <div className={styles.filters}>
         {filters.map((option) => (
            <button
               key={option.id}
               onClick={() => selectFilter(option)}
               className={classNames({
                  [styles.filters__filter]: true,
                  [styles['filters__filter--ativo']]: filter === option.id,
               })}
            >
               {option.label}
            </button>
         ))}
      </div>
   )
}
