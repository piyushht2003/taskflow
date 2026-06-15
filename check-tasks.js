const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const tasks = await prisma.task.findMany({ include: { project: true } });
  console.log(JSON.stringify(tasks, null, 2));
}

run().finally(() => prisma.$disconnect());
