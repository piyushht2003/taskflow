import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Migrating existing projects into default workspaces...');
  
  const projects = await prisma.project.findMany({
    where: { workspaceId: null },
    include: { owner: true }
  });

  if (projects.length === 0) {
    console.log('No projects need migration.');
    return;
  }

  // Create a default workspace for each unique owner
  const owners = [...new Set(projects.map(p => p.ownerId))];
  
  for (const ownerId of owners) {
    let workspace = await prisma.workspace.findFirst({
      where: { ownerId, name: 'Default Workspace' }
    });

    if (!workspace) {
      workspace = await prisma.workspace.create({
        data: {
          name: 'Default Workspace',
          ownerId
        }
      });
      console.log(`Created Default Workspace for owner ${ownerId}`);
    }

    // Assign all null-workspace projects to this workspace
    await prisma.project.updateMany({
      where: { ownerId, workspaceId: null },
      data: { workspaceId: workspace.id }
    });
    console.log(`Migrated projects for owner ${ownerId} to workspace ${workspace.id}`);
  }

  console.log('Migration complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
