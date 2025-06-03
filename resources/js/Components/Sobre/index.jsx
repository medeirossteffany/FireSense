import React from "react";

export const Sobre = ({titulo, descricao, img}) => {
    return (
        <div className="hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out px-6 py-4 bg-green-200 rounded-2xl flex flex-col items-center text-green-950">
            <h3 className="text-lg font-bold mb-2">{titulo}</h3>
            <p className="text-center text-sm">
                {descricao}
            </p>
            <img src={img} className="w-1/2" alt="" />
        </div>
    );
};
