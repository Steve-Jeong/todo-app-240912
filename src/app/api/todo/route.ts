import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'

type Todo = {
  id: number,
  title: string,
  createdAt: Date,
};

export async function GET() {
  const todos = await prisma.todos.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(todos);
}
export async function POST(request: Request) {
  const { title } = await request.json();

  // schema.prisma의 content와 위 request.json()의 content가
  // 같아서 아래 data : { content }가 됨.  
  const todo = await prisma.todos.create({
    data: { title },
  });
  return NextResponse.json(todo);
}
