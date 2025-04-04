// Importamos el tipo `Activity` desde el archivo "../types"
import { Activity } from "../types";

// Definimos un tipo para las acciones que puede manejar nuestro reducer
export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "restart-app"}
// Definimos el tipo del estado que manejará el reducer
export type ActivityState = {
  activities: Activity[]; // El estado contiene un array de actividades
  activeId: Activity['id']
};

const localStorageActivities = () : Activity[] => {
   const activities = localStorage.getItem('activities')
   return activities ? JSON.parse(activities) : []
}

// Creamos un estado inicial con un array vacío de actividades
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: ''
};

// Definimos el reducer que manejará las actualizaciones del estado
export const activityReducer = (
  state: ActivityState = initialState, // Estado actual, con valor por defecto `initialState`
  action: ActivityActions // Acción que recibe el reducer
) => {
  // Verificamos si el tipo de acción es 'save-activity'
  if (action.type === "save-activity") {
    // Retornamos un nuevo estado con la nueva actividad agregada al array

    let updatedActivities : Activity[] = []
    if(state.activeId){
      updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
     
    }else{
      updatedActivities = [...state.activities, action.payload.newActivity]
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: ''
    };
  }

  if(action.type === "set-activeId"){
      return {
        ...state,
        activeId: action.payload.id
      }
  }
  if(action.type === 'delete-activity'){
    return{
      ...state,
      activities: state.activities.filter((activity) => activity.id !== action.payload.id)
    }
  }

  if(action.type === "restart-app"){
    return {
      activities: [],
      activeId: ''
    };
    
  }
  // Si la acción no coincide con ninguna conocida, devolvemos el estado sin cambios
  return state;
};
