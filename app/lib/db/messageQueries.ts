import { v4 as uuidv4 } from "uuid";
import { getDb } from "./astradb";
import { ChatMessage } from "../definitions";
import { config } from "../settings";
const db = await getDb();

export async function saveMessage(
  message: Omit<ChatMessage, "id" | "timestamp">
) {
  try {
    const messageTable = db.table(config.MESSAGE_TABLE);
    const res = await messageTable.insertOne({
      message_id: uuidv4(),
      flow_id: message.flow_id,
      session_id: message.session_id,
      text: message.text,
      sender_name: message.sender_name,
      timestamp: new Date().toISOString(),
    });

    return res;
  } catch (err) {
    console.error("Error saving message:", err);
    throw err;
  }
}

export async function getSessionMessages(
  session_id: string,
  flow_id: string
): Promise<ChatMessage[]> {
  try {
    const messageTable = db.table(config.MESSAGE_TABLE);
    const messages = await messageTable
      .find({
        flow_id: flow_id,
        session_id: session_id,
      })
      .toArray();

    return messages as ChatMessage[];
  } catch (err) {
    console.error("Error fetching session messages:", err);
    throw err;
  }
}
