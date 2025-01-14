import { getSessionMessages } from "@/app/lib/db/messageQueries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string; flowId: string } }
) {
  try {
    // Get the session ID and flow ID from the URL params
    const { uuid: sessionId, flowId } = params;

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