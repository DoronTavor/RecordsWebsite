import React from "react";

function title(props){
    return (
        <div>
            <h1> {props.name}</h1>
            <h2> {props.artist}</h2>
            <h2> {props.format}</h2>
            <h3>            {props.year}</h3>
        </div>
    );
}

export default title;