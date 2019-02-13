import { Categoria } from './Categoria';

export class Subcategoria {
    constructor(
        public nombre: string,
        public subCategoriaDe: Categoria
    ) { }
}