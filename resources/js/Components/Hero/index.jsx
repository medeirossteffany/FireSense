import { Link } from "@inertiajs/react";
import React from "react";

export const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto md:px-10">
            <div className="h-[450px] md:h-[95vh] p-2 md:text-start md:items-start text-center flex items-center md:justify-center justify-end flex-col gap-6 md:gap-4">
                <h1 className="text-[#185431] text-2xl md:text-4xl lg:text-6xl font-extrabold md:w-1/2 lg:font-title md:mb-4">
                    FireSense: a nova era da agricultura sustentável
                </h1>
                <p className="text-sm md:text-md lg:w-1/2">
                    Bem-vindo à nova era da agricultura sustentável e protegida.
                    Nossa plataforma comercial de monitoramento climático foi
                    desenvolvida especialmente para propriedades rurais, com
                    foco total na prevenção de queimadas e na preservação
                    ambiental.
                </p>
                <Link href="/register" className="md:w-[20%] text-center bg-green-950 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 md:mb-12">
                    Começar Agora
                </Link>
            </div>
        </section>
    );
};
