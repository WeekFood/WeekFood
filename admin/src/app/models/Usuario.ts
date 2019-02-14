export class Usuario {
    public contraseña : string = ""
    // shorthand https://www.stevefenton.co.uk/2013/04/stop-manually-assigning-typescript-constructor-parameters/
    constructor(
        public id: number,
        public nick: string,
        public nombre: string,
        public apellidos: string,
        public foto: string,
        public sexo: string,
        public telefono: number,
        public nacimiento: string,
        public nivelprivilegio: number,
    ) {
        // Por si lo termino
        // Narrador : Y eso nunca ocurrió
        /*
        if (nacimientoStr !== "") {
            var trozosNacimiento = nacimientoStr.split("-")
            this.nacimiento = new Date(
                parseInt(trozosNacimiento[0]),
                parseInt(trozosNacimiento[1]) - 1,
                parseInt(trozosNacimiento[2])
            )
        }*/ 
    }
}