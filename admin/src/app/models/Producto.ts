export class Producto {
    // shorthand https://www.stevefenton.co.uk/2013/04/stop-manually-assigning-typescript-constructor-parameters/
    constructor(
        public id: number,
        public nombre: string,
        public categoria: string, /* pendiente pasar a Categoria[] o algo asi */
        public descripcion: string,
        public foto: string,
        public destacado: boolean,
        public precio: number
    ) {}
}