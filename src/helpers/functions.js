const nerdamer = require("nerdamer/all.min");

export const calcularFxn = ( equation = '', xn = 0 ) => {

    const fxn = nerdamer( equation, {x: xn} );

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
        
        
        xnMenosUno = xn;
        xn = gx;
        gxAux = xn;
        n++;
    }
}