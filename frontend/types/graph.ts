export interface PaperNode {
  id: string;
  label: string;
  type: "paper";
  metadata: {
    title: string;
    authors: string[];
    publication_year: number | null;
    institution: string | null;
    domain: string | null;
    cited_by_count: number | null;
    doi: string | null;
    open_alex_id: string | null;
  };
}

export interface GraphEdge {
  source: string;
  target: string;
  type: "cites" | "related" | "shares_author" | "shares_domain" | "co_cited";
  weight?: number;
}

export interface GraphResponse {
  nodes: PaperNode[];
  edges: GraphEdge[];
  meta: {
    total_nodes: number;
    total_edges: number;
    filters_applied: GraphFilters;
  };
}

export interface GraphFilters {
  author?: string;
  publication_year_start?: number;
  publication_year_end?: number;
  institution?: string;
  domain?: string;
  keyword?: string;
  limit?: number;
}
