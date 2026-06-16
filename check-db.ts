const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const workspaces = await prisma.workspace.findMany({ include: { members: true } });
  console.dir(workspaces, { depth: null });
}

main().catch(console.error).finally(() => prisma.$disconnect());
