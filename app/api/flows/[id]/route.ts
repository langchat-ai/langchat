import { NextResponse } from 'next/server';
import { getFlow } from '@/app/lib/db/flowQueries';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const flow = await getFlow(params.id);

  if (!flow) {
    return NextResponse.json(
      { error: 'Flow not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(flow);
} 

