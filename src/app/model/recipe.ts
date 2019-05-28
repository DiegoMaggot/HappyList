import { Ingredient } from './ingredient';
export class Recipe {
    uid: string;
    name: string;
    ingredients: Ingredient[];
    duration: number;
    dificulty: string;
}
