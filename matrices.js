//LIBRERIA DE LAS MATRICES BY @GALUITO
//ASIGNATURA: Lenguajes de Clientes Web
//Alumno: Luis Nathaniel Galue Nunez
//C.I.: 29.811.809

/*
Desarrollar una libreria llamada "Matrix.js" que contenga:

1. Crear una matriz de n*m (valores opcionales -> 1: crea matriz identidad; 0: crea matriz con ceros (defecto)).

    Ejemplo: var m = new Matriz();
             m.create (3, 3, 0); LISTO

2. Calcular la matriz traspuesta. LISTO

3. Multiplicar la matriz por un escalar. LISTO

4. Multiplicar dos matrices. LISTO

5. Calcular la inversa de la matriz. LISTO

6. Sumar 2 matrices. LISTO

7. Restar 2 matrices. LISTO

8. addColData(new Array()); LISTO

9. addRowData(new Array()); LISTO
*/

class Matriz{
    constructor(filas, columnas, tipo = 0){
        this.filas = filas;
        this.columnas = columnas;
        this.contenido = [];
        if(tipo == 1 && this.filas == this.columnas){
            for(let i = 0; i < this.filas; i++){
                let fil = [];
                for(let j = 0; j < this.columnas; j++){
                    if(i == j){
                        fil[j] = 1;
                    }
                    else{
                        fil[j] = 0;
                    }
                }
                this.contenido[i] = fil;
            }
        }
        else{
            if(tipo == 1){
                console.log("La matriz no es cuadrada, no se puede hacer identidad");
            }
            for(let i = 0; i < this.filas; i++){
                let fil = [];
                for(let j = 0; j < this.columnas; j++){
                    fil[j] = 0;
                }
                this.contenido[i] = fil;
            }
        }
        } 


    imprimir(){
        console.log("Matriz ", this.filas, 'x', this.columnas);
        for(let i = 0; i < this.filas; i++){
            //console.log("Fila: ", i+1)
            for(let j = 0; j < this.columnas; j++){
                //console.log(this.contenido[i][j]);
                process.stdout.write(String(this.contenido[i][j]) + " ");
            }
            console.log();
        }
        console.log();
    }

    porEscalar(escalar){
        var res = []
        var fil;
        for(let i = 0; i < this.filas; i++){
            fil = [];
            for(let j = 0; j < this.columnas; j++){
                fil[j] = this.contenido[i][j] * escalar;
            }
            res[i] = fil;
        }
        let nuevaMatriz = new Matriz(this.filas, this.columnas);
        for(let i = 0; i < this.filas; i++){
            nuevaMatriz.llenarFila(i, res[i]);
        }
        return nuevaMatriz;
    }

    transpuesta(){
        let res = [];
        let fil;
        for(let i = 0; i < this.columnas; i++){
            fil = []
            for(let j = 0; j < this.filas; j++){
                fil[j] = this.contenido[j][i];
            }
            res[i] = fil;
        }

        let nuevaMatriz = new Matriz(this.columnas, this.filas);
        for(let i = 0; i < this.columnas; i++){
            nuevaMatriz.llenarFila(i, res[i]);
        }
        return nuevaMatriz;
    }

    sumar(that){
        //this + that
        if(this.columnas == that.columnas && this.filas == that.filas){
            let result = [];
            let fil;
            for(let i = 0; i < this.filas; i++){
                fil = [];
                for(let j = 0; j < this.columnas; j++){
                    fil[j] = this.contenido[i][j] + that.contenido[i][j];
                }
                result[i] = fil;
            }
            //return result;
            let nuevaMatriz = new Matriz(this.filas, this.columnas);
            for(let i = 0; i < this.filas; i++){
                nuevaMatriz.llenarFila(i, result[i]);
            }
            return nuevaMatriz;
            
        }

        else{
            console.log("El numero de filas y columnas no es igual, no se puede sumar")
            return [];
        }
    }

    restar(that){
        //this - that
        if(this.columnas == that.columnas && this.filas == that.filas){
            let result = [];
            let fil;
            for(let i = 0; i < this.filas; i++){
                fil = [];
                for(let j = 0; j < this.columnas; j++){
                    fil[j] = this.contenido[i][j] - that.contenido[i][j];
                }
                result[i] = fil;
            }
            //return result;
            let nuevaMatriz = new Matriz(this.filas, this.columnas);
            for(let i = 0; i < this.filas; i++){
                nuevaMatriz.llenarFila(i, result[i]);
            }
            return nuevaMatriz;
            
        }

        else{
            console.log("El numero de filas y columnas no es igual, no se puede restar")
            return [];
        }
    }

    llenarFila(n, array){
        //Ingresar n en formato de array (Partiendo de 0 a "infinito")
        if(n < this.filas){
            for(let i = 0; i < this.columnas; i++){
                this.contenido[n] = array;
            }
        }
        else{
            console.log("Fila no valida");
        }
    }

    llenarColumna(n, array){
        //Ingresar n en formato de array (Partiendo de 0 a "infinito")
        if(n < this.columnas){
            for(let i = 0; i < this.filas; i++){
                this.contenido[i][n] = array[i];
            }
        }
        else{
            console.log("Columna no valida");
        }
    }

    productoCruz(that){
        //Retorna una matriz, dicha matriz es el producto cruz de this x that.
        if(this.columnas == that.filas){
            let suma;
            let result = [];
            let fil;
            for(let i = 0; i < this.filas; i++){
                fil = [];
                for(let j = 0; j < that.columnas; j++){
                    suma = 0;
                    for(let k = 0; k < this.columnas; k++){
                        suma += this.contenido[i][k] * that.contenido[k][j];
                    }
                    fil[j] = suma;
                }
                result[i] = fil;
            }

            //return result;

            let nuevaMatriz = new Matriz(this.filas, that.columnas);
            for(let i = 0; i < this.filas; i++){
                nuevaMatriz.llenarFila(i, result[i]);
            }
            return nuevaMatriz;
        }
        else{
            console.log("Las columnas de la primera no son iguales a las filas de la segunda.");
            return [];
        }
    }

    /**
     * 
     * determinante()
     * @deprecated
     * no se va a usar mas... sorry
     */
    determinante(){
        //Retorna el determinante de una matriz cuadrada (2x2 o 3x3) en formato numerico.
        if(this.filas == this.columnas){
            if(this.filas == 1){
                return this.contenido[0][0];
            }
            if(this.filas == 2){
                return this.contenido[0][0] * this.contenido[1][1] - this.contenido[0][1] * this.contenido[1][0];
            }
            if(this.filas == 3){
                return this.contenido[0][0] * this.contenido[1][1] * this.contenido[2][2] + this.contenido[0][1] * this.contenido[1][2] * this.contenido[2][0] + this.contenido[1][0] * this.contenido[2][1] * this.contenido[0][2] - this.contenido[0][2] * this.contenido[1][1] * this.contenido[2][0] - this.contenido[0][1] * this.contenido[1][0] * this.contenido[2][2] - this.contenido[1][2] * this.contenido[2][1] * this.contenido[0][0];
            }
            if(this.filas != 1 && this.filas != 2 && this.filas != 3){
                console.log("Numero muy grande de filas, lo siento.")
            }
        }

        else{
            console.log("El determinante solo le puede ser calculado a una matriz cuadrada");
            return 0;
        }
    }

    inversa(){
        //Retorna un objeto de tipo matriz
        //Retorna la matriz inversa.
       
        if(this.filas != this.columnas){
            console.log("Solo las matrices cuadradas tienen inversa.!");
            return;
        }
        let ratio;

        //Creando la matriz en la que se va a realizar el proceso, haciendo una copia de la original
        let nuevaMatriz = new Matriz(this.filas, this.columnas*2);
        for(let i = 0; i < this.filas; i++){
            nuevaMatriz.llenarFila(i, this.contenido[i]);
        }
        
        //Agregando la matriz identidad al final de la matriz.
        for(let i = 0; i <this.filas; i++){
            for(let j = 0; j < this.filas; j++){
                if(i==j){
                    //console.log("A")
                    //Al estar trabajando con arrays se puede hacer a traves de push
                    nuevaMatriz.contenido[i].push(1);
                }
                else{
                    //console.log("B")
                    //Cada vez que i sea = que j se hace push de un 1, sino 0.
                    nuevaMatriz.contenido[i].push(0);
                }
            }
        }

        for(let i = 0; i < this.filas; i++){
            //Si en alguno de los casos Aii es 0 el programa muere...
            if(nuevaMatriz.contenido[i][i] == 0.0){
                console.log("PROBLEMA QUE NO SE RESOLVER ");
                return;
            }
            for(let j = 0; j < this.filas; j++){
                if(i!=j){
                    ratio = nuevaMatriz.contenido[j][i]/nuevaMatriz.contenido[i][i];
                    for(let k = 0; k < this.filas*2; k++){
                        nuevaMatriz.contenido[j][k] = nuevaMatriz.contenido[j][k] - ratio*nuevaMatriz.contenido[i][k];
                    }
                }
            }
        }
        console.log("Primer paso");
        nuevaMatriz.imprimir();

        for(let i = 0; i < this.filas; i++){
            for(let j = this.filas; j < this.filas*2; j++){
                //Se hace a partir de las matriz identidad agregada, no se tocan los pivotes
                nuevaMatriz.contenido[i][j] = nuevaMatriz.contenido[i][j]/nuevaMatriz.contenido[i][i];
            }
        }

        console.log("Segundo Paso");
        nuevaMatriz.imprimir();

        let matrizRetornada = new Matriz(this.filas, this.columnas);
        for(let i = 0; i < this.filas; i++){
            matrizRetornada.llenarFila(i, nuevaMatriz.contenido[i].slice(this.filas, this.filas*2));
        }

        //matrizRetornada.imprimir();

        return matrizRetornada;
    }


}

var A = new Matriz(2,2);
A.llenarFila(0, [2, 4]);
A.llenarFila(1, [6, 8]);
A.imprimir();

let C = A.inversa();
C.imprimir();

var B = new Matriz(3, 3);
B.llenarFila(0, [1, 1, 3]);
B.llenarFila(1, [1, 3, -3]);
B.llenarFila(2, [-2, -4, -4]);
B.imprimir();

let D = B.inversa();
D.imprimir();

//ANOTACION, EL CODIGO FUE EVOLUCIONANDO CONFORME LO FUI ESCRIBIENDO, CON ESTO LO QUE QUIERO DECIR ES QUE EN UN PRINCIPIO
//MI CODIGO RETORNABA SIMPLEMENTE ARRAYS ANIDADOS [[],[],[]], LUEGO SI PUDO RETORNAR INSTANCIAS DE LA CLASE MATRIZ
//POR ESO, ALGUNAS DE MIS PRUEBAS ANTERIORES NO TIENEN SENTIDO CON LO QUE HACEN, O HACEN UN CONSOLE LOG DE ALGO INNECESARIO.

/*
var A = new Matriz(2, 2);
A.llenarFila(0, [2, 4]);
A.llenarFila(1, [8, 16]);
var B = new Matriz(2, 2);
B.llenarFila(0, [32, 64]);
B.llenarFila(1, [128, 256]);

var C = A.sumar(B);
console.log(C);
C.imprimir();

var D = B.transpuesta();
D.imprimir();

var E = B.porEscalar(5);
E.imprimir();

*/
/*
var C = new Matriz(2, 5);
console.log(C.determinante());

var A = new Matriz(2,2);
A.llenarFila(0, [5, -3]);
A.llenarFila(1, [6, 4]);
A.imprimir();
console.log(A.determinante());

var B = new Matriz(3, 3);
B.llenarFila(0, [-2, 4, 5]);
B.llenarFila(1, [6, 7, -3]);
B.llenarFila(2, [3, 0, 2]);
B.imprimir();
console.log(B.determinante());

prueba = B.inversa();
prueba.imprimir();
*/


/*
var A = new Matriz(2, 4);
var B = new Matriz(4, 3);

A.llenarFila(0, [5, 3, -4, -2]);
A.llenarFila(1, [8, -1, 0, -3]);
A.imprimir();

B.llenarColumna(0, [1, -5, 0, 5]);
B.llenarColumna(1, [4, 3, -9, 1]);
B.llenarColumna(2, [0, 7, 5, 4]);
B.imprimir();

var C = A.productoCruz(B);
console.log(C);
C.imprimir();

*/


/*
var matrizDePrueba = new Matriz(3, 3);
matrizDePrueba.imprimir();
matrizDePrueba.llenarFila(0, [1, 2, 3]);
matrizDePrueba.llenarFila(1, [4, 5, 6]);
matrizDePrueba.llenarFila(2, [7, 8, 9]);
matrizDePrueba.imprimir();


matrizDePrueba.transpuesta();
matrizDePrueba.imprimir();


var mdp = new Matriz(3, 3);
mdp.imprimir();
mdp.llenarColumna(0, [1, 2, 3]);
mdp.llenarColumna(1, [4, 5, 6]);
mdp.llenarColumna(2, [7, 8, 9]);
mdp.imprimir();

mdp.transpuesta();
mdp.imprimir();
*/


/*
//console.log("Imprimiendo 3x3")
var tresx3 = new Matriz(3, 3, 1);
tresx3.imprimir();
tresx3.porEscalar(5);
tresx3.transpuesta();
tresx3.imprimir();

var tresx3_2 = new Matriz(3, 3, 1);
tresx3_2.imprimir();

suma = tresx3.sumar(tresx3_2);
console.log(suma);

resta = tresx3.restar(tresx3_2);
console.log(resta);

console.log();

//console.log("Imprimiendo 2x2");
var dosx2 = new Matriz(2, 2, 1);
dosx2.imprimir();
sumaImposible = dosx2.sumar(tresx3);
console.log(sumaImposible);

//console.log("Imprimiendo 1x5");
var unox5 = new Matriz(1, 5);
unox5.imprimir();
unox5.transpuesta();
unox5.imprimir();
restaImposible = unox5.restar(dosx2);
console.log(restaImposible);
*/

