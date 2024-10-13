'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/api/auth/user.signout.service';

export default function Dashboard() {
    const router = useRouter();

    const handleCardClick = (path: string) => {
        router.push(path);
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/");
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-12">Dashboard</h1>
            <div className="flex flex-row space-x-8">
                <div
                    onClick={() => handleCardClick('/dashboard/products')}
                    className="cursor-pointer bg-white p-8 rounded-lg shadow-md w-64 h-48 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-200"
                >
                    <h2 className="text-2xl font-semibold">Products</h2>
                </div>
                <div
                    onClick={() => handleCardClick('/dashboard/rewards')}
                    className="cursor-pointer bg-white p-8 rounded-lg shadow-md w-64 h-48 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-200"
                >
                    <h2 className="text-2xl font-semibold">Rewards</h2>
                </div>
            </div>
            <p
                onClick={handleLogout}
                className="mt-12 text-blue-600 cursor-pointer hover:underline"
            >
                Sign out the console
            </p>
        </main>
    );
}
