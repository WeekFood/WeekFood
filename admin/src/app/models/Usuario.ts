export class Usuario {
    // shorthand https://www.stevefenton.co.uk/2013/04/stop-manually-assigning-typescript-constructor-parameters/
    constructor(
        public id: number,
        public contraseña: string,
        public nick: string,
        public nombre: string,
        public apellidos: string,
        public foto: string,
        public sexo: string,
        public telefono: number,
        public nacimiento: string,
        public nivelprivilegio: number,
    ) { }
}