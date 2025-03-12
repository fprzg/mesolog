import { migrate } from "drizzle-orm/postgres-js/migrator"
import { db } from "./index"

// This script can be run to apply migrations
async function main() {
  console.log("Running migrations...")

  await migrate(db, { migrationsFolder: "drizzle" })

  console.log("Migrations complete!")

  process.exit(0)
}

main().catch((error) => {
  console.error("Migration failed:", error)
  process.exit(1)
})

