import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}
export const db = global.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") global.prisma = db;

export * from "@prisma/client";
