import { ITask } from "../../../types/task";
import style from "./Item.module.scss";

interface Props extends ITask {
   selectTask: (selectedTask: ITask) => void;
}

export default function Item({
   task,
   time,
   selected,
   completed,
   id,
   selectTask,
}: Props) {
   return (
      <li
         className={`${style.item} ${selected ? style.itemSelecionado : ""} ${
            completed ? style.itemCompletado : ""
         }`}
         onClick={() =>
            !completed &&
            selectTask({
               time,
               task,
               selected,
               completed,
               id,
            })
         }
      >
         <h3>{task}</h3>
         <span>{time}</span>
         {completed && (
            <span
               className={style.concluido}
               arial-label="Item completado"
            ></span>
         )}
      </li>
   );
}
