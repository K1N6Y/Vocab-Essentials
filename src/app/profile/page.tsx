'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [preferredLanguage, setPreferredLanguage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const sessionResponse = await supabase.auth.getSession();
                console.log('Session Response:', sessionResponse);

                const user = sessionResponse?.data?.session?.user;
                if (!user) {
                    setError('No active session found.');
                    return;
                }

                const { data, error } = await supabase
                    .from('users')
                    .select('username, preferred_language')
                    .eq('auth_id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error);
                    setError('Error fetching profile data.');
                } else if (data) {
                    setUsername(data.username || '');
                    setPreferredLanguage(data.preferred_language || 'German');
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                setError('An unexpected error occurred.');
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        const sessionResponse = await supabase.auth.getSession();

        if (sessionResponse?.data?.session?.user) {
            const { user } = sessionResponse.data.session;

            const { error } = await supabase
                .from('users')
                .update({ username, preferred_language: preferredLanguage })
                .eq('auth_id', user.id);

            if (error) {
                setError('Failed to update profile.');
                setSuccess('');
            } else {
                setSuccess('Profile updated successfully!');
                setError('');
            }
        } else {
            setError('No active session found. Please log in again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Preferred Language</label>
                    <select
                        value={preferredLanguage}
                        onChange={(e) => setPreferredLanguage(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="German">German</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                </div>
                <button
                    onClick={handleUpdate}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
}