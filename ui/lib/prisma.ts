// // import { PrismaClient } from '@prisma/client';

// // let prisma: PrismaClient;

// // if (process.env.NODE_ENV === 'production') {
// //   prisma = new PrismaClient();
// // } else {
// //   if (!global.prisma) {
// //     global.prisma = new PrismaClient();
// //   }
// //   prisma = global.prisma;
// // }

// // export default prisma;

// // lib/prisma.ts
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'], // Optional: logs SQL queries
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// export default prisma;