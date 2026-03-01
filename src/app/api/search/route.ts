import neo4j from "neo4j-driver";
import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../lib/neo4j";
import { toNode } from "../../../lib/transform";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query parameter 'q'" },
      { status: 400 },
    );
  }

  try {
    const cypher = `
      MATCH (p:Paper)
      WHERE toLower(p.title) CONTAINS toLower($query)
      RETURN p
      LIMIT $limit
    `;

    const records = await runQuery(cypher, {
      query,
      limit: neo4j.int(20),
    });

    const nodes = records.map((record) => toNode(record.p.properties));

    return NextResponse.json({
      results: nodes,
      total: nodes.length,
      query,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to execute search" },
      { status: 500 },
    );
  }
}
