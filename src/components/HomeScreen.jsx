import React, {  useState } from 'react'

import Swal from 'sweetalert2';

import { diffEquation, newton, secante } from '../helpers/functions';
import { useForm } from '../hooks/useForm'
import { ChartScreen } from './ChartScreen';


export const HomeScreen = () => {

    const [formValues, handleInputChange, reset, setValues] = useForm({
        ecuacion: 'x^3*cos(x)+3*x-6',
        xnValue:0,
        derivada: 0,
        resultados: ''
    })

    const { ecuacion, xnValue, derivada, resultados } = formValues;

    const [plot, setplot] = useState(false);

    const handleReset = () => {
        reset();
        setplot(false);
    }

    const handleSecante = () => {
        
       if(xnValue === 0 ){
            return Swal.fire({
                title: 'El valor de Xn es 0 desea continuar?',
                text: "se evaluara con el valor indicado!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continuar!'
            }).then((result) => {
                if (result.isConfirmed) {
                Swal.fire(
                    'Confirmado!',
                    'Tu resultado esta siendo procesado.',
                    'success'
                )
                const value = secante(xnValue, ecuacion);
                    setValues({
                            ...formValues,
                            resultados: value,
                        })
                setplot(true);
                
                }
            })
       }
       Swal.fire(
            'Confirmado!',
            'Tu resultado esta siendo procesado.',
            'success'
        )
        const value = secante(xnValue, ecuacion);
        setValues({
            ...formValues,
            resultados: value,
        })

    }



    const handleNewton = () => {
        const diffEqua = diffEquation(ecuacion);

        const val = newton(xnValue, ecuacion, diffEqua);
        
        setValues({
            ...formValues,
            derivada: diffEqua,
            resultados: val
        })
        setplot(true);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col m-3">
                        <h3 className="text text-muted ">Ingresa la ecuaci&oacute;n:</h3>
                        <input 
                            type="text" 
                            className="form form-control"
                            name="ecuacion"
                            value={ecuacion}
                            onChange={handleInputChange}

                        />

                        <h3 className="text text-muted mt-3">Ingresa Xn:</h3>
                        <input 
                            type="text" 
                            className="form form-control"
                            name="xnValue"
                            value={xnValue}
                            onChange={handleInputChange}
                        
                        />

                        <h3 className="text text-muted mt-3">Derivada:</h3>
                        <input 
                            type="text" 
                            className="form form-control"
                            name="derivada"
                            value={derivada}
                            onChange={handleInputChange}
                        
                        />
                        
                        <h3 className="text text-muted mt-3">Resultados:</h3>
                        <input 
                            type="text" 
                            className="form form-control" 
                            name="resultados"
                            value={resultados}
                            onChange={handleInputChange}
                        
                        />

                        <div className="container mt-3">
                            
                            <button 
                                className="btn btn-outline-primary m-1"
                                onClick = {handleSecante}
                            >Secante</button>
                            <button 
                                className="btn btn-outline-success m-1"
                                onClick = {handleNewton}
                            >Newton</button>
                            <button 
                                className="btn btn-danger m-1"
                                onClick={handleReset}
                            >Reset</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    
                    {
                        (plot) && <ChartScreen equation = {ecuacion}/>

                    }
                </div>
            </div>
        
        </>
    )
}
