import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon} from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch} : ActivityListProps) {
    
    // Iteramos aqui dependiendo de category que viene de Activity para poner el name y no el id 
    const CategoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '') , [activities])
    const isEmptyActivity = useMemo(() => activities.length === 0, [activities]);
  return (
    <div>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      
      { isEmptyActivity ? <p className="text-center py-5">No hay actividades aún...</p> :
      
      activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase 
                    ${
                      activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                    }`}
            >
              {CategoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="font-black text-4xl text-lime-500">
              {activity.calories} {""}
              <span>Calorias</span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <button
              onClick={() =>
                dispatch({
                  type: "set-activeId",
                  payload: { id: activity.id },
                })
              }
            >
              <PencilSquareIcon className="w-8 h-8 text-gray-800" />
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "delete-activity",
                  payload: { id: activity.id },
                })
              }
            >
              <XCircleIcon 
              className="w-8 h-8 text-red-500"
               />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
