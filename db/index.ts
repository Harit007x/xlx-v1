import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const client = globalThis.prisma ?? prismaClientSingleton()


if (process.env.NODE_ENV !== 'production') globalThis.prisma = client