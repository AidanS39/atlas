import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/neo4j";
import { toNode } from "@/lib/transform";
import { GraphEdge, GraphResponse } from "@/types/graph";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);

  try {
    const cypher = `
      MATCH (p:Paper {id: $id})
      OPTIONAL MATCH (p)-[r:CITES]->(neighbor:Paper)
      OPTIONAL MATCH (other:Paper)-[r2:CITES]->(p)
      RETURN p,
             collect(distinct neighbor) AS outgoing,
             collect(distinct other) AS incoming
    `;

    const records = await runQuery(cypher, { id });

    if (records.length === 0) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    const record = records[0];
    const mainNode = toNode(record.p.properties);
    const outgoing = record.outgoing;
    const incoming = record.incoming;

    const neighborNodes = [
      ...outgoing.map((n: any) => toNode(n.properties)),
      ...incoming.map((n: any) => toNode(n.properties)),
    ];

    const allNodes = [mainNode, ...neighborNodes];

    const edges: GraphEdge[] = [
      ...outgoing.map((n: any) => ({
        source: mainNode.id,
        target: n.properties.id,
        type: "cites" as const,
        weight: 1,
      })),
      ...incoming.map((n: any) => ({
        source: n.properties.id,
        target: mainNode.id,
        type: "cites" as const,
        weight: 1,
      })),
    ];

    const response: GraphResponse = {
      nodes: allNodes,
      edges,
      meta: {
        total_nodes: allNodes.length,
        total_edges: edges.length,
        filters_applied: {},
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Paper API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch paper data" },
      { status: 500 },
    );
  }
}
