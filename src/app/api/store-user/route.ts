import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const userData = await req.json();

  try {
    // Assuming you have a User model in your Prisma schema
    const user = await prisma.user.upsert({
      where: { id: userData.id },
      update: userData,
      create: userData,
    });
    console.log(user)
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error storing user data:', error);
    return NextResponse.json({ error: 'Error storing user data' }, { status: 500 });
  }
}
