'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function RootClientComponent({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    return (
        <>
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between">
                    <a href="/" className="text-xl font-bold">Vocab Essentials</a>
                    {loading ? (
                        <span>Loading...</span>
                    ) : user ? (
                        <div className="space-x-4">
                            <span>Welcome, {user.email}</span>
                            <a href="/profile" className="hover:underline">Profile</a>
                            <button
                                onClick={async () => {
                                    await supabase.auth.signOut();
                                    setUser(null);
                                }}
                                className="hover:underline"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <a href="/login" className="hover:underline">Login</a>
                            <a href="/register" className="hover:underline">Register</a>
                        </div>
                    )}
                </div>
            </nav>
            <main>{children}</main>
        </>
    );
}