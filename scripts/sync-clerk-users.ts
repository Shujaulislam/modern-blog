// const { createClerkClient } = require("@clerk/backend");
// const { PrismaClient } = require("@prisma/client");

// const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
// const prisma = new PrismaClient();

// async function syncUsers() {
//   try {
//     console.log('Fetching users from Clerk...');
//     const response = await clerk.users.getUserList();
//     const clerkUsers = response.data;

//     console.log(`Found ${clerkUsers.length} users in Clerk`);
    
//     for (const clerkUser of clerkUsers) {
//       console.log('Processing user:', clerkUser.id);
      
//       await prisma.user.upsert({
//         where: { clerkId: clerkUser.id },
//         update: {
//           email: clerkUser.emailAddresses[0]?.emailAddress,
//           username: clerkUser.username || undefined,
//           role: clerkUser.publicMetadata?.role === 'admin' ? 'ADMIN' : 'USER',
//         },
//         create: {
//           clerkId: clerkUser.id,
//           email: clerkUser.emailAddresses[0]?.emailAddress!,
//           username: clerkUser.username || undefined,
//           role: clerkUser.publicMetadata?.role === 'admin' ? 'ADMIN' : 'USER',
//         },
//       });
//       console.log(`Synced user: ${clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress}`);
//     }
    
//     console.log('Users synced successfully');
//   } catch (error) {
//     console.error('Error details:', {
//       name: error.name,
//       message: error.message,
//       stack: error.stack
//     });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// syncUsers();