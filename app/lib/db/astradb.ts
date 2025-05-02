import { DataAPIClient, Db } from '@datastax/astra-db-ts';

let db: Db;

export async function getDb() {
    if (!db) {
        try {   
            console.log("Creating db connection");
            const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
            db = await client.db(process.env.ASTRA_DB_API_ENDPOINT || '', { keyspace: process.env.ASTRA_DB_KEYSPACE || '' });
            console.log("Db connection created");
        } catch (error) {
            console.error("Error creating db connection", error);
        }
    }
    return db;
}