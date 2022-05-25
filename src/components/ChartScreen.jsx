import functionPlot from "function-plot";
import { useEffect } from "react";



// let contentsBounds = document.body.getBoundingClientRect();
let width = 800;
let height = 500;
// let ratio = contentsBounds.width / width;
// width *= ratio;
// height *= ratio;



export const ChartScreen = ({equation}) => {


    useEffect(() => {

      functionPlot({
        target: "#grafica",
        width,
        height,
        yAxis: { domain: [-1, 9] },
        grid: true,
        data: [
          {
            fn: equation,
            
          }
        ]
      });

    }, [ equation])
    

    return (
        <>
                <div className="col-lg-6 m-3 grafica " id="grafica">
                  <div className="container">
                    
                  </div>

                </div>

        </>
    )
}
