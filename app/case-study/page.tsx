import { SiteHeader } from "../../components/SiteHeader";

const stages = [
  ["01", "Discovery", "Turn a vague research need into a bounded product decision: should a care team run a pilot?"],
  ["02", "Normalize", "Map papers and reports into one evidence schema: population, intervention, outcomes, strength, limits, and implementation meaning."],
  ["03", "Retrieve", "Search source chunks and records together, then require every synthesis claim to remain traceable."],
  ["04", "Synthesize", "Generate a fixed decision brief with explicit uncertainty and a refusal path when evidence is insufficient."],
  ["05", "Evaluate", "Test retrieval coverage, citation correctness, unsupported claims, answer consistency, and usefulness to target professionals."],
  ["06", "Review", "Keep evidence ratings and publishing under human control; log source, prompt, model, output, and approval state."],
];

export default function CaseStudyPage() {
  return <main><SiteHeader />
    <section className="case-hero shell"><p className="eyebrow">Case study · Building in public</p><h1>From research fragments to a defensible product decision.</h1><p>SUVANÉ Research is a human-in-the-loop AI implementation case: discovery, data modeling, retrieval, structured synthesis, evaluation, deployment, and operational safeguards.</p></section>
    <section className="case-body shell">
      <div className="case-summary"><div><span>Problem</span><strong>Research is abundant. Decision context is missing.</strong></div><div><span>User</span><strong>Health product, innovation, and care teams.</strong></div><div><span>Outcome</span><strong>A traceable pilot recommendation—not another summary.</strong></div></div>
      <div className="process"><p className="eyebrow">System workflow</p>{stages.map(([number, title, copy]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>)}</div>
      <div className="architecture"><div><p className="eyebrow">Architecture direction</p><h2>A modular monolith before a platform.</h2><p>The live decision surface now calls a FastAPI service with deterministic retrieval, structured Pydantic contracts, verified evidence records, and an explicit insufficient-evidence path. Postgres/pgvector, ingestion workers, and reviewer state remain later milestones.</p></div><div className="flow"><span>Verified sources</span><i>→</i><span>Deterministic retrieval</span><i>→</i><span>Decision brief</span><i>→</i><span>Source traceability</span><i>→</i><span>Human judgment</span></div></div>
      <div className="evaluation"><p className="eyebrow">Evaluation plan</p><h2>The demo is not complete when it produces an answer.</h2><div className="evaluation-grid"><div><b>Retrieval</b><p>Did the system find the evidence needed to answer the question?</p></div><div><b>Grounding</b><p>Does every material claim match and cite a retrieved source?</p></div><div><b>Calibration</b><p>Does confidence fall when evidence quality or coverage is weak?</p></div><div><b>Decision utility</b><p>Can a professional identify the next responsible action?</p></div></div></div>
      <div className="next-build"><p className="eyebrow">Current status</p><h2>Live retrieval connected. Evaluation is next.</h2><p>The current checkpoint connects the product surface to a deployed FastAPI service and six-record verified corpus. The next milestone is a 10–20 question evaluation set covering relevance, citation correctness, refusals, and decision utility.</p></div>
    </section>
  </main>;
}
