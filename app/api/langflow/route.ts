import { NextResponse } from "next/server";
import { mockFlows } from "@/app/lib/mock-data";
import { Flow } from "@/app/lib/definitions";
import { headers } from "next/headers";
import { saveMessage } from "@/app/lib/db/messageQueries";

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

    const flow: Flow | undefined = mockFlows.find((f) => f.id === flowId);

    if (!flow) {
      return NextResponse.json({ error: "Flow not found" }, { status: 404 });
    }

    await saveMessage({
      flow_id: flowId,
      session_id: sessionId,
      text: message,
      sender_name: "user",
    });

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LANGFLOW_API_KEY}`,
      };

      const body = {
        input_value: message,
        input_type: "chat",
        output_type: "chat",
        session_id: sessionId,
      };

      console.log(body);

      const response = await fetch(flow.endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${JSON.stringify(
            responseMessage
          )}`
        );
      }

      const result = responseMessage.outputs[0].outputs[0].results.message;
      const resultMessage = {
        flow_id: flowId,
        session_id: result.session_id,
        text: result.text,
        sender_name: result.sender_name,
        timestamp: result.timestamp,
      };

      await saveMessage(resultMessage);

      return NextResponse.json(resultMessage);
    } catch (error) {
      console.error("Request Error:", error.message);
      throw error;
    }
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
