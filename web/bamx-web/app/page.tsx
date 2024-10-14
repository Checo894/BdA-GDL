'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center justify-center mt-16"
                onClick={() => router.push('/sign-in')}
            >
                identifícate
            </button>
        </main>
    );
}
