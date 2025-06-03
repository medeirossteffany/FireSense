import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div
            className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
            style={{
                backgroundImage: "url('/images/fundo.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
           <Link href="/" className="flex justify-center mb-4 w-1/2 mx-auto">
                <img src="/images/logo.png"  className="w-[50%] md:w-[30%]"  alt="" />
            </Link>
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
