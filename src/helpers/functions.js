import Swal from 'sweetalert2';

const nerdamer = require("nerdamer/all.min");

export const calcularFxn = ( equation = '', xn = 0 ) => {

    const fxn = nerdamer( equation, {x: xn} ).evaluate();

    return Number( Number ( fxn.text() ).toFixed(7)) ;
}

export const calcularGxn = (xn = 0, xnMenosUno = 0, fxn = 0, fxnMenosUno = 0) => {

    const gx = (xn) - (( (xn - xnMenosUno) / ( fxn - fxnMenosUno ) ) * fxn);

    return Number(gx.toFixed(7));
}

export const secante = (xnValue, equation) => {
    let xn = xnValue;
    //realizar la resta al valor de xn-1
    let xnMenosUno = (xn - 1);

    let error = 0;
    let gxAux = 0;
    //definir funcion 4x**4 + 9x**3 - 5x**2 + 9x - 9
    let n = 1;
    
    while(true){

        const fxn = calcularFxn(equation, xn);

        const fxnMenosUno = calcularFxn( equation , xnMenosUno);

        const gx = calcularGxn( xn, xnMenosUno, fxn, fxnMenosUno);

        if( n > 1){
            error = Number( Math.abs(gxAux - gx).toFixed(6) ); 
            if(error <= 0.001){
                return gx;
            }
        }
        
        if(n > 1000){
            return  Swal.fire(
                'Confirmado!',
                'Tu resultado esta siendo procesado.',
                'success'
            );
        }
        xnMenosUno = xn;
        xn = gx;
        gxAux = xn;
        n++;
    }
}

export const newton = (xnValue, equation, diffEquation) => {
     
    let xn = xnValue;
    let gxAux = 0;
    let n = 1;
    let flag = true;
    let error = 0;
    while(flag){

        let fxn = calcularFxn(equation, xn);
        let fxnDiff = calcularFxn(diffEquation, xn);
        let gx = calcularGxnNewton(xn, fxn, fxnDiff);

        

        if( n > 1){
            error = Math.abs(gxAux - gx).toFixed(6);

            if(error <= 0.0001){
               

                flag = false;
                return gx;
            }
        }

        xn = gx;
        
        gxAux = xn;
        
        if(n > 1000){
            Swal.fire(
                'Cambiar Xn!',
                'No se encuentra la raiz',
                'warning'
            )
            return 0;
            
        }
        n++;
    }
        
    
    
}

export const diffEquation = (equation) => {

    return nerdamer(`diff(${equation})`).text();
}

const  calcularGxnNewton = ( xn,  fxn,  fxnDiff) => {
        
    return (xn - (fxn/fxnDiff));
}