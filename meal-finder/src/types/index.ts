export type Category = {
  strCategory: string;
};
// export type CategoriesResponse = { //--ya no se necesitaria porque ya lo coloque en el axios.get<{meals: T[]}>(url, {signal})
//   meals: Category[];
// };

export type Meal = {
  //-----se le coloco el mismo nombre del objeto pero perfectamente se podria otro nombre
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};
