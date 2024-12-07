'use client';

import { useEffect, useState } from 'react';

type Word = {
    english: string;
    german: string;
    category: string;
    gender: string;
    difficulty: number;
    badge_level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
};

export default function Dossier() {
    const [words, setWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWords = async () => {
            const res = await fetch('/api/words');
            const data = await res.json();

            if (Array.isArray(data)) {
                setWords(data);
            } else {
                console.error('API response is not an array:', data);
                setWords([]);
            }
            setLoading(false);
        };

        fetchWords();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (words.length === 0) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Your Dossier</h1>
                <p className="text-center text-gray-500">No words found. Start by adding some vocabulary!</p>
            </div>
        );
    }

    // Group words by category
    const categories = words.reduce<Record<string, Word[]>>((acc, word) => {
        if (!acc[word.category]) {
            acc[word.category] = [];
        }
        acc[word.category].push(word);
        return acc;
    }, {});

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Your Dossier</h1>
            {Object.entries(categories).map(([category, categoryWords]) => (
                <div key={category} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {categoryWords.map((word, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white rounded shadow-md border-l-4"
                                style={{
                                    borderColor:
                                        word.badge_level === 'Bronze'
                                            ? '#cd7f32'
                                            : word.badge_level === 'Silver'
                                                ? '#c0c0c0'
                                                : word.badge_level === 'Gold'
                                                    ? '#ffd700'
                                                    : '#e5e4e2',
                                }}
                            >
                                <h3 className="text-lg font-semibold capitalize">{word.english}</h3>
                                <p className="text-sm text-gray-600 capitalize">Translation: {word.german}</p>
                                <p className="text-sm text-gray-500">Gender: {word.gender}</p>
                                <p className="text-sm font-bold">Badge: {word.badge_level}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}