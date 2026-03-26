/**
 * Vercel Serverless Database Connection
 *
 * Uses mysql2 + drizzle-orm, same schema as the Manus deployment.
 * Connection is cached across warm invocations.
 */

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../../drizzle/schema";

let cachedConnection: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (cachedConnection) return cachedConnection;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const connection = await mysql.createConnection({
    uri: databaseUrl,
    ssl: { rejectUnauthorized: true },
  });

  cachedConnection = drizzle(connection, { schema, mode: "default" });
  return cachedConnection;
}
