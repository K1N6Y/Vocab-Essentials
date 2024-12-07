'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            setError(error.message);
        } else {
            const user = data.user;
            if (user) {
                await supabase
                    .from('users')
                    .insert({ auth_id: user.id, email: user.email });
            }

            router.push('/login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    onClick={handleRegister}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Register
                </button>
                <p className="text-sm mt-4">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}