// Importación de eventos change y el useState 
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// Importación de la base de datos , simulación de base de datos
import { categories } from "../data/categories"
import type { Activity } from "../types"; 
import { ActivityActions, ActivityState,  } from "../reducers/activity-reducer";

type FromProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

export default function Form({ dispatch, state } : FromProps) {

 

  const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };
  // Como sn state que se vincula se puedne pasar como un objeto, con los datos que pasamos 
  // por el formulario, con su tipo de dato, number, string etc...

  const [ activity, setActivity ] = useState<Activity>(initialState)

   useEffect(() => {
     if (state.activeId) {
       const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
       setActivity(selectedActivity)
      }
   }, [state.activeId]);

  // Evento para poder traerlos cambios que surgan en el formulario, mediante 
  // e.target.id y extraemos el value
  const handleChange = (e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

   // En el state nos pasa los datos numericos como string , entonces hacemos que nos pase los datos correctos
   // en este caso si son string que m lso pase a number y si son d estring que asi se pasen 

  const isNumberField = ["category", "calories"].includes(e.target.id);
    
  // Asi podemos mantener los datos en el state spread operator y los nuevos cambiso de datos en el form
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    });
  
  }

  // Función para habilitar y deshabilitar el input de tipo submit

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   // Esto se hace para desencadenar un acción especifica del reducer 
   dispatch({ type: "save-activity", payload: { newActivity: activity}})
   setActivity({
     ...initialState,
     id: uuidv4()
   });
  }

  return (
    <form 
    className="space-y-5 bg-white shadow p-10 rounded-lg"
    onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoria:</label>
        <select 
        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        id="category"
        value={activity.category}
        onChange={handleChange}
        >
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>

        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>

        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias: ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input 
      type="submit" 
      className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white disabled:opacity-10"
      // Cambiar el texto dependiendo que se escoja
      value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
      
      disabled={!isValidActivity()}
      />
    </form>
  );
}
