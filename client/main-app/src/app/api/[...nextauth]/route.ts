import { NextResponse } from 'next/server';

export async function GET() {
    // Logic lấy danh sách người dùng
    return NextResponse.json({ message: 'GET users success' });
}

export async function POST(req: Request) {
    const body = await req.json();
    if (!body) {
        return new NextResponse('Invalid data', { status: 400 });
    }
    // Logic tạo mới người dùng
    return NextResponse.json({ message: 'User created successfully' });
}