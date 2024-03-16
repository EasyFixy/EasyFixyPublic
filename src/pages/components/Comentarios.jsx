import React from "react";

const Comentarios = () => {
    return(
        <div className='w-full h-auto flex flex-col border-2 border-grey-500 p-4 m-4'>
            <div className='w-full h-auto flex flex-row'>
                <img src="/icons/icon-user.png" alt="foto usuario" className="h-14 w-14 bg-gray-300 px-2 py-1" />
                <section className='px-2 w-full h-auto flex flex-col'>
                    <h1>Nombre usuario</h1>
                    <section className="flex flex-row">
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                        <img src="/icons/icon-star.png" alt="Estrellita"  className="px-1 py-1 h-8 w-8"/>
                    </section>
                </section>
            </div>
            <div>
                <p className="p-4 w-full h-auto">comentario...</p>
            </div>
            
        </div>
    );
}

export default Comentarios;