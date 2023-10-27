import React from "react";
import "../sass/main.css";

   const setClassName = childrenValue => {
        if (childrenValue == "DEL") return "del";
        if (childrenValue == "RESET") return "large reset";
        if (childrenValue == "=") return "large calculate";
    }

const Boton = (props) => 
    (<div className={`button ${setClassName(props.children)}`} onClick={() => props.func(props.children)}> 
        {props.children}
    </div>);

export default Boton;