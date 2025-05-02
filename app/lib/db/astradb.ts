import { DataAPIClient, Db } from "@datastax/astra-db-ts";
import {
  CreateTableDefinition,
  InferTablePrimaryKey,
  InferTableSchema,
} from "@datastax/astra-db-ts";

let db: Db;

export async function getDb() {
  if (!db) {
    try {
      console.log("Creating db connection");
      
      if (!process.env.ASTRA_DB_TOKEN) {
        throw new Error("ASTRA_DB_TOKEN is not set");
      }
      
      if (!process.env.ASTRA_DB_API_ENDPOINT) {
        throw new Error("ASTRA_DB_API_ENDPOINT is not set");
      }

      if (!process.env.ASTRA_DB_KEYSPACE) {
        throw new Error("ASTRA_DB_KEYSPACE is not set");
      }
      const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
      db = await client.db(process.env.ASTRA_DB_API_ENDPOINT, {
        keyspace: process.env.ASTRA_DB_KEYSPACE,
      });
      await db.listTables();
      console.log("Db connection created");
    } catch (error) {
      console.error("Error creating db connection", error);
    }
  }
  return db;
}


const FlowTableDefinition = <const>{
    columns: {
        flowId: 'uuid',
        application: 'text',
        createdAt: 'timestamp',
        description: 'text',
        endpoint: 'text',
        environment: 'text',
        flowEndpoint: 'text',
        folder: 'text',
        name: 'text',
        status: 'text',
        updatedAt: 'timestamp',
    },
    primaryKey: {
      partitionBy: ['flowId']
    },
  } satisfies CreateTableDefinition;

  export type FlowTableSchema = InferTableSchema<typeof FlowTableDefinition>;