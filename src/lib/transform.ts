import { PaperNode } from "../types/graph";

export function toNode(properties: any): PaperNode {
    const p = properties;
    return {
        id: p.id,
        label: p.title,
        type: "paper",
        metadata: {
            title: p.title ?? null,
            authorships: p.authorships ?? [],
            publication_year: p.publication_year ? p.publication_year.toNumber() : null,
            publication_date: p.publication_date ?? null,
            institution: p.institution ?? null,
            field: p.field ?? null,
            cited_by_count: p.cited_by_count ? p.cited_by_count.toNumber() : null,
            citation_normalized_percentile: p.citation_normalized_percentile ?? null,
            referenced_works_count: p.referenced_works_count
                ? p.referenced_works_count.toNumber()
                : null,
            primary_topic: p.primary_topic ?? null,
            primary_location_source: p.primary_location_source ?? null,
            keywords: p.keywords ?? [],
            doi: p.doi ?? null,
            open_alex_id: p.id ?? null,
        },
    };
}
