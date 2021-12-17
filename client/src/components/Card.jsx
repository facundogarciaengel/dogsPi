import React from "react";

export default function Card({name, image, weight}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{weight}</h5>
            <img src={image} alt="img not found" width="200px" height="220px" border="2%"></img>
        </div>
    )
}
