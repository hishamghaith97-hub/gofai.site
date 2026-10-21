import "server-only";
import { MongoClient } from "mongodb";

// One MongoClient per server process. In development, Next.js reloads modules on every
// change, so the client is kept on globalThis to avoid opening a new pool each time.
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

export function getMongoClient(): MongoClient {
  if (globalForMongo.mongoClient) return globalForMongo.mongoClient;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set. Add it to .env.local (see .env.example).");

  // Not connected yet: the driver connects on the first operation.
  const client = new MongoClient(uri, { appName: "aisystem" });
  globalForMongo.mongoClient = client;
  return client;
}

export function getDb() {
  return getMongoClient().db(process.env.MONGODB_DB || "aisystem");
}
