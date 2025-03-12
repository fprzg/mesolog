import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Use environment variables for connection string in production
const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/gymtracker"

// Create postgres connection
const client = postgres(connectionString)

// Create drizzle database instance
export const db = drizzle(client, { schema })

