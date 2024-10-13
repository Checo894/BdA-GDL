'use client';

import { useEffect, useState } from 'react';
import { login } from '@/api/auth/user.signin.service';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { auth } from '@/api/firebase.service';

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem('isAuthenticated', 'true');
                router.push('/dashboard');
            } else {
                setUser(null);
                localStorage.removeItem('isAuthenticated');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogin = async () => {
        try {
            const loggedInUser = await login(email, password);
            if (loggedInUser) {
                setUser(loggedInUser);
                localStorage.setItem('isAuthenticated', 'true');
                router.push("/dashboard");
            } else {
                setUser(null);
                setError("You are not authorized to access this page.");
            }
        } catch (error) {
            setError("An error occurred during sign-in. Please try again.");
        }
    };

    if (user === null && error) {
        return (
            <section className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                    <h1 className="text-2xl font-semibold mb-6">Not Authorized</h1>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
                >
                    Login
                </button>
                {error && <p className="text-red-600 mt-4">{error}</p>}
            </div>
        </section>
    );
};

export default SignIn;
