import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
    const { data, error } = await supabase.from('words').select('english, german, category, gender, difficulty, badge_level');

    if (error) {
        console.error('Error fetching words:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}