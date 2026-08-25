"use client";

import { useMemo, useState } from "react";
import { SiteHeader } from "../../components/SiteHeader";
import { evidenceRecords } from "../../data/evidence";

export default function EvidencePage() {
  const [query, setQuery] = useState("");
  const [strength, setStrength] = useState("All");
  const records = useMemo(() => evidenceRecords.filter((item) => {
    const matchesQuery = `${item.title} ${item.authors} ${item.type} ${item.population} ${item.outcomes.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (strength === "All" || item.strength === strength);
  }), [query, strength]);

  return <main><SiteHeader />
    <section className="page-head shell"><p className="eyebrow">Evidence library</p><h1>Research, normalized for decisions.</h1><p>Each record separates what a source studied, what it found, what it cannot establish, and how it should—or should not—shape a pilot.</p></section>
    <section className="library shell">
      <div className="filter-bar">
        <label><span>Search the curated corpus</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try loneliness, voice assistant, implementation…" /></label>
        <label><span>Evidence strength</span><select value={strength} onChange={(e) => setStrength(e.target.value)}><option>All</option><option>Moderate</option><option>Limited</option><option>Early</option></select></label>
      </div>
      <p className="result-count">{records.length} of {evidenceRecords.length} records</p>
      <div className="evidence-list">{records.map((item) => <article className="evidence-record" key={item.id}>
        <div className="record-top"><div><span className={`badge ${item.strength.toLowerCase()}`}>{item.strength}</span><span className="record-type">{item.type} · {item.year}</span></div><a href={item.url} target="_blank" rel="noreferrer">Open source ↗</a></div>
        <h2>{item.title}</h2><p className="authors">{item.authors}</p>
        <div className="record-grid"><div><small>Population</small><p>{item.population}</p></div><div><small>Intervention</small><p>{item.intervention}</p></div><div><small>Outcomes</small><p>{item.outcomes.join(" · ")}</p></div></div>
        <div className="record-judgment"><div><small>Finding</small><p>{item.takeaway}</p></div><div><small>Important limitation</small><p>{item.limitation}</p></div><div><small>Implementation meaning</small><p>{item.implication}</p></div></div>
      </article>)}</div>
      {records.length === 0 && <div className="empty-state"><h2>No matching records</h2><p>Try a broader term or clear the evidence-strength filter.</p></div>}
    </section>
  </main>;
}
