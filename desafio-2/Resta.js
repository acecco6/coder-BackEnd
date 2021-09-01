class Resta {
    // - Los cálculos habilitados estarán definidos en archivos separados empleando clases donde los argumentos
    // de entrada se guardarán en propiedades instancia privadas y tendrán un método 'resultado' que hará
    // efectiva la operación. 

    // de entrada se guardarán en propiedades instancia privadas y tendrán un método 'resultado' que hará
    // efectiva la operación. (caso para .ts)
    _num1;
    _num2;

    constructor(num1, num2) {
        this._num1 = num1;
        this._num2 = num2;
    }

    resultado = () => this._num1 - this._num2;
}

export default Resta;