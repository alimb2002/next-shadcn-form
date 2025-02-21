import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Singleton pattern to avoid multiple instances of Prisma Client in development mode
const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// If we're in production, just create a new instance of Prisma Client.
// If we're in development mode, use the global singleton instance to avoid creating multiple Prisma Clients.
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Set prismaGlobal to the singleton instance in development
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
