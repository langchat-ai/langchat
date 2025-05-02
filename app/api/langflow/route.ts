import { NextResponse } from "next/server";
import { Flow } from "@/app/lib/definitions";
import { LangflowClient } from "@datastax/langflow-client";
import { saveMessage } from "@/app/lib/db/messageQueries";
import { getFlow } from "@/app/lib/db/flowModel";
import { UUID } from "@datastax/astra-db-ts";
import { environments } from "@/app/lib/config";
import { updateSession } from "@/app/lib/db/sessionQueries";

type ChatRequest = {
  flowId: string;
  sessionId: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { flowId, sessionId, message } = body;

    // Validate required parameters
    if (!flowId || !sessionId || !message) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const flowInfo = await getFlow(flowId);

    const environment =
      environments.find((e) => e.id === flowInfo.environment) ||
      environments[0];

    await updateSession({
      userId: process.env.USER_ID || "",
      flowId: flowId,
      sessionId: sessionId,
      summary: "",
    });

    const messageId = await saveMessage({
      flowId: new UUID(flowId),
      sessionId: new UUID(sessionId),
      message: message,
      senderName: "user",
    });

    const client = new LangflowClient({
      //baseUrl: environment.baseUrl.replace(/<([^>]+)>/g, (_, variable) => process.env[variable] || ''),
      langflowId: process.env[environment.langflowIdEnvVar],
      apiKey: process.env[environment.tokenEnvVar],
    });

    const flow = client.flow(flowInfo.flowEndpoint);

    const response = await flow.run(message);

    const result = response.outputs[0].outputs[0].results.message;
    const resultMessage = {
      id: messageId,
      flowId: flowId,
      sessionId: sessionId,
      message: response.chatOutputText(),
      senderName: result.sender_name,
      timestamp: result.timestamp,
    };

    const savedMessageId = await saveMessage({
      flowId: new UUID(flowId),
      sessionId: new UUID(sessionId),
      message: result.text,
      senderName: result.sender_name,
    });

    resultMessage.id = savedMessageId;

    return NextResponse.json(resultMessage);
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
