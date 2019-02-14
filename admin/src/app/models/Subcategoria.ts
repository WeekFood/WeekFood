import { Categoria } from 'src/app/models/Categoria';

export class Subcategoria {
    constructor(
        public nombre: string,
        public subCategoriaDe: Categoria
    ) { }
}