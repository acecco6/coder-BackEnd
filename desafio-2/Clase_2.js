// - Los cálculos habilitados estarán definidos en archivos separados empleando clases donde los argumentos
import Suma from "./Suma.js"; // modulo suma
import Resta from "./Resta.js"; // modulo resta


// - Crear dos funciones llamadas operacion y operaciones.
// - operacion recibirá dos números y un string con el nombre de la operación a efectuar 
// entre ellos: 'suma' ó 'resta' y cargará dinámicamente un módulo para realizar dicho cálculo.
const operacion = async (num1, num2, operar) => {
    if (operar === "resta") {
        // - operacion deberá devolver el resultado a operaciones a través de una promesa.
        return await new Promise(resolve => {
            resolve(new Resta(num1, num2).resultado())
        });
    } if (operar === "suma") {
        // - operacion deberá devolver el resultado a operaciones a través de una promesa.
        return await new Promise(resolve => {
            resolve(new Suma(num1, num2).resultado())
        });
    } else {
        return await new Promise(resolve => {
            resolve(0)
        });
    }
};

// - operaciones llamará a operacion con los casos de prueba, representando sus salidas.
const operaciones = async (
    num1,
    num2,
    operacion,
    callback
) => {
    let result = await callback(num1, num2, operacion);
    console.log(result);
}

operaciones(5, 5, "suma", operacion);
operaciones(12, 5, "resta", operacion);