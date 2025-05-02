import { v4 as uuidv4 } from "uuid";
import { getDb } from "./astradb";
import { ChatMessage } from "../definitions";
import { DataAPITimestamp } from "@datastax/astra-db-ts";
const db = await getDb();

export async function updateSession({userId, flowId, sessionId, summary}: {userId: string, flowId: string, sessionId: string, summary: string}) {
  const sessionTable = db.table("langchat_sessions");
  const session = await sessionTable.updateOne({userId: userId,
    flowId: flowId,
    sessionId: sessionId,
  },{
    $set: {
      summary: summary,
      updatedAt: new DataAPITimestamp(new Date().toISOString()),
    }
  });

  return sessionId;
}