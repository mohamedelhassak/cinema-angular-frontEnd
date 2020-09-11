import {CategoryModel} from "./Category.model";

export interface FilmRequestModelModel {

  titre: string;
  description: string;
  category: CategoryModel
  realisatur: string;
  date_sortir: Date;
  duree: number

}
