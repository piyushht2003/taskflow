import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient({})
async function run() {
  try {
    const users = await prisma.user.findMany()
    console.log("Success! Users:", users)
  } catch(e) {
    console.error("Error:", e)
  }
}
run()
