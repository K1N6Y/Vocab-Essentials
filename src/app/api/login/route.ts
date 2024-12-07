import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();

    if (body.email === 'test@example.com' && body.password === 'password') {
        return NextResponse.json({ token: 'fake-jwt-token' });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}