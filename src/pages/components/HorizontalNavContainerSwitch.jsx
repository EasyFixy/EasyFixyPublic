import React, { useState } from "react";
import ToolbarDefault from "./ToolbarDefaul";

const HorizontalNavContainerSwitch = (props) => {
    let content = props.content;
    const [seccionActiva, setSeccionActiva] = useState(0);

    return (
        <>
            <div className="w-100">
                <div className="flex">
                {content.map((seccion, index) => (
                    <div className={index==seccionActiva ? "m-4 p-4 text-orange-500 underline": "m-4 p-4"} key={index} onClick={() => setSeccionActiva(index)}>
                        {seccion.name}
                    </div>
                ))}
                </div>
                <div>{props.extra}</div>
                <div className="rounded-xl shadow-2xl p-6 m-6">
                    {content[seccionActiva].content}
                </div>
            </div>
        </>

    )
}

export default HorizontalNavContainerSwitch;