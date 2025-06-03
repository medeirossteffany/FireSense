    import { Link } from "@inertiajs/react";
    import { useEffect, useState } from "react";

    export default function Header({ children }) {
        const [scrolled, setScrolled] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                setScrolled(window.scrollY > 20);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        return (
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
        } lg:py-3 lg:px-24 p-2 flex justify-between items-center`}>
                <div className="lg:w-[200px] w-[200px] p-4 md:p-2">
                    <img
                        src="images/logo.png"
                        alt="FireSense Logo"
                        className="cursor-pointer w-full h-auto hover:opacity-70 transition-opacity duration-300" 
                        />
                </div>
                
                <nav className="flex gap-4">
                    {children.user ? (
                        <Link
                            href={route("dashboard")}
                            className="px-4 py-3 md:text-base text-sm rounded-lg bg-green-950 text-white border-2 border-green-950 hover:text-green-950 hover:bg-transparent transition duration-300" >
                            Dashboard
                        </Link>
                    ) : (
                        <div className="gap-4 flex items-center">
                            <Link
                                href={route("login")}
                                className="border-2 md:px-6 md:text-base text-sm px-4 py-3 rounded-lg border-green-950 hover:text-white hover:bg-green-950 transition duration-300"  >
                                Entrar
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-4 py-3 md:text-base text-sm rounded-lg bg-green-950 text-white border-2 border-green-950 hover:text-green-950 hover:bg-transparent transition duration-300" >
                                Cadastrar
                            </Link>
                        </div>
                    )}
                </nav>
            </header>
        );
    }
