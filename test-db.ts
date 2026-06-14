import { prisma } from "./src/lib/prisma"

async function test() {
  try {
    const users = await prisma.user.findMany()
    console.log("DB connection successful! Users:", users)
  } catch (err) {
    console.error("DB connection failed:", err)
  }
}

test()
