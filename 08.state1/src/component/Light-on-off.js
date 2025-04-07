import { useState } from "react";

const LightOnOff = () => {
     // light = true,false 



        const [light,setLight] = useState(false);
        return(
            <>
              {light ? <h2 style={{color:'red'}}>전구ON</h2> : <h2 style={{color:'gray'}}>전구OFF</h2>}
                <button onClick={()=>{setLight(!light)}}>
                    {light ? "끄기" : "켜기"}
                </button>
            </>
        )

}

export default LightOnOff;