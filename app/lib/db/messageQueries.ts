import { v4 as uuidv4 } from "uuid";
import { getDb } from "./astradb";
import { ChatMessage } from "../definitions";
const db = await getDb();

export async function saveMessageFeedback(messageId: string, feedback: string) {
  const messageTable = db.table("langchat_messages");
  await messageTable.updateOne({id: messageId}, {$set: {feedback: feedback}});
}

export async function saveMessage(
  message: Omit<ChatMessage, "id" | "timestamp">
) {
  try {
    const messageTable = db.table("langchat_messages");
    const messageId = uuidv4();
    const res = await messageTable.insertOne({
      messageId: messageId,
      flowId: message.flowId,
      sessionId: message.sessionId,
      message: message.message,
      senderName: message.senderName,
      timestamp: new Date().toISOString(),
    });

    return messageId;
  } catch (err) {
    console.error("Error saving message:", err);
    throw err;
  }
}

export async function getSessionMessages(
  sessionId: string,
  flowId: string
): Promise<ChatMessage[]> {
  try {
    const messageTable = db.table("langchat_messages");
    const messages = await messageTable
      .find({
        flowId: flowId,
        sessionId: sessionId,
      })
      .toArray();

    return messages as ChatMessage[];
  } catch (err) {
    console.error("Error fetching session messages:", err);
    throw err;
  }
}
