// Type para las categorias
export type Category = {
  id: number;
  name: string;
};

// Typa para las activiades
export type Activity = {
  id: string,
  category: number,
  name: string,
  calories: number
};