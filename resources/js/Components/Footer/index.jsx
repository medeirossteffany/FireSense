import { Link } from "@inertiajs/react";

export const Footer = () => {
    return (
        <footer className="bg-[#efefef] mt-20 border-t shadow-md text-black py-10 text-center text-sm ">
                <Link href="/" className="flex justify-center mb-4 w-1/2 mx-auto">
                    <img src="/favicon.png"  className="w-[30%] md:w-[8%]"  alt="" />
                </Link>
            &copy; 2025 FireSense. Todos os direitos reservados.
        </footer>
    );
};
