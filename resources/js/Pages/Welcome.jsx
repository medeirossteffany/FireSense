import { Footer } from "@/Components/Footer";
import Header from "@/Components/Header";
import { Hero } from "@/Components/Hero";
import ScrollQueimadas from "@/Components/ScrollQueimadas";
import { Sobre } from "@/Components/Sobre";
import { Topico } from "@/Components/Topico";
import { Head, Link } from "@inertiajs/react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Welcome({ auth }) {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: "ease-out-cubic",
        });
    }, []);

    return (
        <>
            <Head title="FireSense" />
            <div className="md:bg-center hero bg-green-100">
                <Header>{auth}</Header>

                <main className="max-w-full mx-auto">
                    <Hero />

                    <div className="relative flex items-center justify-center">
                        <section className="md:absolute md:bottom-0 bg-white/30 backdrop-blur-md shadow-sm max-w-5xl mb-4 md:mb-2 mx-auto mt-12 flex items-center md:rounded-md p-6 ">
                            <div className="flex flex-col">
                                <h2 className="text-green-950 font-bold text-lg md:text-2xl "> Queimadas na Agricultura</h2>
                                <p className="text-green-950 md:w-[70%] text-md">Dados que revelam o impacto real das queimadas no agronegócio brasileiro.</p>
                            </div>

                            <a href="#queimadas" className="mt-2 px-10 py-3 rounded-full bg-green-800 text-white hover:bg-green-900 transition font-medium shadow-md">
                                <KeyboardDoubleArrowDownIcon />
                            </a>
                        </section>
                    </div>

                    <section id="queimadas" className="">
                        <ScrollQueimadas />
                    </section>

                    <div className="-mt-[150vh]" />

                    <section className="">
                        <div className="px-10 py-12 text-white lg:h-[70vh] bg-[#0f37209a] flex flex-col w-full">
                            <h2 className="mb-6 text-4xl font-700 text-center">
                                Sobre a plataforma FireSense
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4">
                                <Sobre titulo="Monitoramento de clima" descricao="Nossa plataforma oferece monitoramento climático em tempo real, permitindo que os agricultores acompanhem as condições climáticas de suas propriedades." img="/images/icon1.png" />

                                <Sobre titulo=" Cálculo de Risco de Queimadas" descricao="Utilizamos algoritmos avançados para calcular o risco de queimadas com base em dados climáticos, ajudando os agricultores a tomar decisões informadas." img="/images/icon2.png" />

                                <Sobre titulo="Irrigação Inteligente" descricao=" Nossa plataforma aciona automaticamente sistemas de irrigação quando o risco de queimadas é alto, garantindo a segurança das lavouras." img="/images/icon3.png" />
                            </div>
                        </div>
                    </section>

                    <section className="px-2 md:px-0 max-w-7xl mx-auto mt-16 py-12">
                        <div className="flex justify-center w-full">
                            <h1 className="text-green-950 text-4xl font-700 text-center">
                                Por que utilizar nossa plataforma?
                            </h1>
                        </div>
                        <div className="flex py-10 md:flex-row flex-col items-center gap-12 justify-between ">
                            <div className="motivos flex items-center justify-center w-full md:w-1/2 md:h-[400px] h-[200px] relative">
                                <div className="ml-[30%] w-1/2"></div>
                            </div>
                            <div className="flex flex-col items-start justify-center gap-4 md:w-1/2">
                               <Topico texto="Cadastro de diferentes propriedades" />
                               <Topico texto="Redução de perdas e prejuízos no campo" />
                               <Topico texto="Monitoramento climático em tempo real" />
                               <Topico texto="Cálculo automático de risco de queimadas" />
                               <Topico texto="Irrigação inteligente acionada automaticamente" />
                            </div>
                        </div>
                    </section>

                    <section
                        className="max-w-7xl mx-auto rounded-sm md:rounded-lg py-10 md:py-16 px-6 md:px-24 bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: "url(/images/bg.jpg)",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="justify-start text-center mb-10">
                            <h2 className="text-[1.2rem] md:text-4xl font-bold text-green-950">
                                Junte-se a nós na luta contra as queimadas!
                            </h2>
                            <p className="text-sm font-semibold text-green-950 opacity-90 md:mt-2"> Faça parte da nossa comunidade e ajude a preservar o meio ambiente.</p>
                        </div>

                        <div className="flex justify-center">
                            <Link href="/register" className="bg-green-950 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300">
                                Cadastre-se agora
                            </Link>
                        </div>
                    </section>

                </main>

                <Footer />
            </div>
        </>
    );
}
