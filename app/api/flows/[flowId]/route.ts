import { NextResponse } from 'next/server';
import { getFlow } from '@/app/lib/db/flowModel';

export async function GET(
  request: Request,
  { params }: { params: { flowId: string } }
) {
  const { flowId } = await params;
  const flow = await getFlow(flowId);

  if (!flow) {
    return NextResponse.json(
      { error: 'Flow not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(flow);
} 

