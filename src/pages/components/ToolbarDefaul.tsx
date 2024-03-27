import React from "react";
const ToolbarDefault = () =>{
    return(
        <div className="w-full h-24 backgroundVerde px-4 flex">
            <div className="w-2/4 flex flex-row justify-start items-center">
                <p className="text-3xl "> EasyFixy</p>
                <img src="/icons/icon.svg" alt="logo" className="w-[10%] pl-2.5" />

            </div>
            <div className="w-2/4 flex flex-row justify-end items-center">
                <p className=" text-white">Ir a EasyFixy</p>

            </div>

        </div>
    )

}
export default ToolbarDefault;