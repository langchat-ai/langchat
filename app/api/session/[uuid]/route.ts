import { getSessionMessages } from "@/app/lib/db/messageQueries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    // Get the session ID from the URL params
    const sessionId = params.uuid;
    
    // Get the flow_id from the query parameters
    const { searchParams } = new URL(request.url);
    const flowId = searchParams.get("flowId");

    if (!flowId) {
      return NextResponse.json(
        { error: "flowId is required" },
        { status: 400 }
      );
    }

    // Fetch messages for the session
    const messages = await getSessionMessages(sessionId, flowId);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching session messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch session messages" },
      { status: 500 }
    );
  }
} 