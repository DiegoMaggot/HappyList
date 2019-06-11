import { Ingredient } from './ingredient';

export class Recipe {
    uid: string;
    name: string;
    dificulty: string;
    ingredients: Ingredient[];
    duration: number;
    servings: number;
}
