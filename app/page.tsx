import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { evidenceRecords } from "../data/evidence";

export default function Home() {
  const sources = evidenceRecords.slice(0, 3);
  return (
    <main>
      <SiteHeader />
      <section className="workbench shell">
        <div className="eyebrow-row">
          <span className="eyebrow">Decision brief · v0.1</span>
          <span className="updated">Curated corpus · {evidenceRecords.length} sources</span>
        </div>
        <div className="question-block">
          <p className="question-label">Decision question</p>
          <h1>Should we pilot an AI companion for older adults living alone?</h1>
          <div className="question-actions">
            <Link className="button primary" href="/ask">Ask SUVANÉ <span>↗</span></Link>
            <Link className="button secondary" href="/evidence">Inspect evidence</Link>
          </div>
        </div>
        <div className="verdict-grid">
          <article className="verdict-card signal">
            <p className="card-kicker">Current conclusion</p>
            <h2>Proceed with a bounded pilot—not a clinical rollout.</h2>
            <p>Early evidence supports feasibility, engagement, and possible loneliness benefits. It does not yet establish durable clinical effectiveness or replacement of human support.</p>
          </article>
          <article className="verdict-card strength">
            <p className="card-kicker">Evidence strength</p>
            <div className="strength-line"><strong>Limited</strong><span>2 / 4</span></div>
            <div className="meter"><i /></div>
            <p>Systematic reviews exist, but the older-adult evidence base is small, heterogeneous, and weighted toward usability studies.</p>
          </article>
        </div>
        <div className="decision-sections">
          <section>
            <p className="section-number">01</p><h3>What appears promising</h3>
            <ul className="finding-list">
              <li><span>↑</span><div><b>Engagement and acceptability</b><p>Voice-first interaction may reduce some interface barriers for older adults.</p></div></li>
              <li><span>↑</span><div><b>Perceived companionship</b><p>Small studies report promising changes in loneliness and social connection.</p></div></li>
              <li><span>↗</span><div><b>Daily routine support</b><p>Reminders and structured check-ins are plausible secondary benefits.</p></div></li>
            </ul>
          </section>
          <section>
            <p className="section-number">02</p><h3>What remains unresolved</h3>
            <ul className="risk-list">
              <li>Durability beyond short follow-up periods</li><li>Effect for people with cognitive impairment</li>
              <li>Risk of displacing—not supplementing—human contact</li><li>Privacy, escalation, consent, and caregiver oversight</li>
            </ul>
          </section>
          <section className="pilot-panel">
            <p className="section-number">03</p><h3>Recommended pilot</h3>
            <p className="pilot-lead">8–12 weeks · 30–50 participants · human-support escalation retained</p>
            <div className="metrics"><span>UCLA Loneliness</span><span>Adoption</span><span>Retention</span><span>Escalations</span><span>Human contact</span><span>Adverse events</span></div>
          </section>
        </div>
      </section>
      <section className="source-strip"><div className="shell">
        <div className="section-heading"><div><p className="eyebrow">Trace the judgment</p><h2>Sources behind this brief</h2></div><Link href="/evidence">View evidence library →</Link></div>
        <div className="source-grid">{sources.map((source) => (
          <article className="source-card" key={source.id}>
            <div className="source-meta"><span>{source.type}</span><span>{source.year}</span></div><h3>{source.title}</h3><p>{source.takeaway}</p>
            <div className="source-foot"><span className={`badge ${source.strength.toLowerCase()}`}>{source.strength}</span><a href={source.url} target="_blank" rel="noreferrer">Original source ↗</a></div>
          </article>
        ))}</div>
      </div></section>
      <section className="boundary shell"><p className="eyebrow">Human-in-the-loop by design</p><h2>AI organizes evidence. People own the decision.</h2><p>SUVANÉ structures research into a fixed decision schema, exposes uncertainty, and keeps every claim linked to its source. It does not diagnose, prescribe, or publish an evidence rating without review.</p><Link href="/case-study">See how the system is built →</Link></section>
    </main>
  );
}
