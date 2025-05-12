import { NextResponse } from "next/server";
import { mockFlows } from "@/app/lib/mock-data";
import { Flow } from "@/app/lib/definitions";
import { headers } from "next/headers";
import { saveMessage } from "@/app/lib/db/messageQueries";
import { getFlow } from "@/app/lib/db/flowManageOperation";

type ChatRequest = {
  flow_id: string;
  session_id: string;
  user_id: string;
  sender_name: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { flow_id, session_id, message, user_id } = body;

    // Validate required parameters
    if (!flow_id || !session_id || !message) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const flow: Flow | undefined = await getFlow(flow_id);

    if (!flow) {
      return NextResponse.json({ error: "Flow not found" }, { status: 404 });
    }

    await saveMessage({
      flow_id: flow_id,
      session_id: session_id,
      text: message,
      sender_name: "user",
      user_id: user_id,
    });

    try {
      if (flow.application === "Langflow") {
        const resultMessage = await invokeLangflow(flow, message, session_id);
        await saveMessage({
          ...resultMessage,
          user_id: user_id,
        });
        return NextResponse.json(resultMessage);
      } else {
        return NextResponse.json({ error: "Unsupported application" }, { status: 400 });
      }
    } catch (error) {
      console.error("Request Error:", error);
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

const invokeLangflow = async (flow: Flow, message: string, session_id: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.LANGFLOW_API_KEY}`,
  };

  const body = {
    input_value: message,
    input_type: "chat",
    output_type: "chat",
    session_id: session_id,
  };

  console.log("Invoking Langflow with body", flow.endpoint, body);

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
    flow_id: flow.flow_id,
    session_id: result.session_id,
    text: result.text,
    sender_name: result.sender_name,
    timestamp: result.timestamp,
  };

  return resultMessage;
};
