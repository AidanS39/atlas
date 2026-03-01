import { NextResponse } from "next/server";

// Stub endpoint — returns empty saved papers list
// TODO: wire up to MongoDB saved_papers collection
export async function GET() {
    return NextResponse.json({ papers: [] });
}

export async function POST() {
    return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE() {
    return NextResponse.json({ success: true });
}
