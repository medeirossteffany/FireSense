import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollQueimadas() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

    let infos = [
        {
            id: 1,
            title: "R$ 14bi em prejuízos no agronegócio",
            description:
                "Entre junho e agosto de 2024, os incêndios no Brasil afetaram 2,8 milhões de hectares de áreas rurais e causaram um prejuízo estimado em R$ 14,7 bilhões, segundo a Confederação da Agricultura e Pecuária do Brasil. ",
            imagem: "/images/queimadas/img1.png",
            color: "#273e28",
        },
        {
            id: 2,
            title: "Aumento das queimadas",
            description:
                "A seca intensa, o calor extremo e os ventos fortes provocaram um aumento expressivo nas queimadas pelo país, afetando florestas e áreas agrícolas, e comprometendo a produção rural e a biodiversidade..",
            imagem: "/images/queimadas/img2.png",
            color: "#29352a",
        },
        {
            id: 3,
            title: "Impacto no solo",
            description: "As queimadas deixam o solo mais pobre, menos fértil e vulnerável à erosão, exigindo mais insumos para manter a produtividade.",
            imagem: "/images/queimadas/img3.jpg",
            color: "#1a1e17",
        },
    ];

    return (
        <section ref={containerRef} className="pointer-events-none relative h-[300vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div style={{ x }} className="flex w-[300vw] h-full">
                    {infos.map((info) => (
                        <div
                            key={info.id}
                            className="w-screen flex flex-col items-center justify-end pb-16 md:pb-4 text-white px-6"
                            style={{ backgroundColor: `${info.color}` }}
                        >
                            <img
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                src={info.imagem}
                                alt={info.description}
                                className="w-[800px] h-[400px] object-cover mb-6 rounded-xl"
                            />
                            <div className="text-center h-[200px]">
                                <motion.h2
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="md:text-4xl text-2xl font-bold"
                                >
                                    {info.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="md:text-lg text-sm mt-6 md:w-1/2 mx-auto"
                                >
                                    {info.description}
                                </motion.p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}