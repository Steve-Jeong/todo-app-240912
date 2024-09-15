import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'

// type Todo = {
//   id: number,
//   title: string,
//   createdAt: Date,
// };

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

export async function PUT(request: Request) {
  const { id, title } = await request.json();
  const updatedTodo = await prisma.todos.update({
    where: { id },
    data: { title },
  });
  return NextResponse.json(updatedTodo);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  await prisma.todos.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Todo deleted successfully' });
}