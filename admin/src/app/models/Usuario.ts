export class Usuario {
    // shorthand https://www.stevefenton.co.uk/2013/04/stop-manually-assigning-typescript-constructor-parameters/
    constructor(
        public id:number,
        public nombre: string,
        public apellidos: string
    ) {}
}