"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "./prisma"

export const createTodo = async (formData : FormData) => {
  const title = formData.get('title') as string
  const todo = await prisma.todos.create({
    data: {title}
  })
  console.log('A new todo has been created', todo)
  revalidatePath('./')
}

export const getTodos = async () => {
  try {
    const todos = await prisma.todos.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return todos
  } catch (err) {
    console.error('error in getTodos : ', err)
    return null
  }
}

export const updateTodo = async (formData : FormData) => {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const nid = Number(id)
  console.log('update todo id : ', id)
  try {
    const updatedTodo = await prisma.todos.update({
      where: { id: nid },
      data: { title }
    })
    console.log('A todo was updated : ', updatedTodo)
  } catch (err) {
    console.error('Error updating todo: ', err)
  }
  revalidatePath('./')
}

export const deleteTodo = async (formData : FormData) => {
  const id = formData.get('id') as string
  const nid = Number(id)
  console.log('delete todo id : ', id)
  const todo = await prisma.todos.findUnique({
    where: {id: nid}
  })
  if(todo) {
    console.log('delete todo ', todo)
    await prisma.todos.delete({where: {id: nid}})
    console.log('A todo was deleted : ', todo)
  }
  revalidatePath('./')
}