"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";

const API_BASE_URL = "https://api.suvane.org";
const example = "Should we pilot AI conversational agents for older adults?";

type Citation = {
  evidence_id: string;
  title: string;
  url: string;
  supported_claims: string[];
};

type DecisionBrief = {
  question: string;
  conclusion: string;
  evidence_strength: string;
  populations_studied: string[];
  outcomes_improved: string[];
  outcomes_not_improved_or_unclear: string[];
  limitations_and_risks: string[];
  pilot_recommendation: string;
  pilot_metrics: string[];
  citations: Citation[];
  insufficient_evidence_reason: string | null;
};

function isDecisionBrief(value: unknown): value is DecisionBrief {
  if (!value || typeof value !== "object") return false;
  const brief = value as Partial<DecisionBrief>;
  return (
    typeof brief.question === "string" &&
    typeof brief.conclusion === "string" &&
    typeof brief.evidence_strength === "string" &&
    typeof brief.pilot_recommendation === "string" &&
    Array.isArray(brief.populations_studied) &&
    Array.isArray(brief.outcomes_improved) &&
    Array.isArray(brief.outcomes_not_improved_or_unclear) &&
    Array.isArray(brief.limitations_and_risks) &&
    Array.isArray(brief.pilot_metrics) &&
    Array.isArray(brief.citations)
  );
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function EvidenceList({ items, empty }: { items: string[]; empty: string }) {
  return items.length > 0
    ? <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    : <p className="answer-empty">{empty}</p>;
}

export default function AskPage() {
  const [question, setQuestion] = useState(example);
  const [answer, setAnswer] = useState<DecisionBrief | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask(event: FormEvent) {
    event.preventDefault();
    const cleanQuestion = question.trim();
    if (cleanQuestion.length < 5) {
      setError("Please enter a focused research question of at least five characters.");
      setAnswer(null);
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 90_000);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null) as { detail?: unknown } | null;
        const detail = typeof payload?.detail === "string" ? payload.detail : null;
        throw new Error(detail ?? `The evidence service returned status ${response.status}.`);
      }

      const payload: unknown = await response.json();
      if (!isDecisionBrief(payload)) {
        throw new Error("The evidence service returned an unexpected response.");
      }
      setAnswer(payload);
    } catch (requestError) {
      setError(
        requestError instanceof DOMException && requestError.name === "AbortError"
          ? "The evidence service took too long to respond. It may be waking from its free-tier sleep; please try once more."
          : requestError instanceof Error
            ? requestError.message
            : "The evidence service could not be reached. Please try again.",
      );
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }

  return <main><SiteHeader />
    <section className="ask-layout shell">
      <aside className="ask-intro">
        <p className="eyebrow">Ask SUVANÉ</p>
        <h1>Start with the decision, not the search terms.</h1>
        <p>Ask a plain-language professional question. SUVANÉ retrieves the most relevant records from a small, human-curated corpus and returns a traceable decision brief.</p>
        <div className="prototype-note"><b>v0 boundary</b><p>Only AI companionship, loneliness, and older-adult social connection are currently in scope. This is decision support, not medical advice.</p></div>
      </aside>
      <div className="ask-workspace">
        <form onSubmit={ask} aria-busy={loading}>
          <label htmlFor="decision-question">Your research question</label>
          <textarea
            id="decision-question"
            value={question}
            required
            minLength={5}
            maxLength={500}
            disabled={loading}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <div className="ask-controls">
            <button type="button" disabled={loading} onClick={() => setQuestion(example)}>Use example</button>
            <button className="button primary" type="submit" disabled={loading}>
              {loading ? "Reviewing evidence…" : "Generate decision brief"} <span>{loading ? "" : "→"}</span>
            </button>
          </div>
        </form>

        {loading && <section className="answer-panel answer-loading" aria-live="polite">
          <span className="answer-status"><i /> Retrieving verified records</span>
          <h2>Building a grounded decision brief…</h2>
          <p>The first request can take up to a minute while the prototype service wakes.</p>
        </section>}

        {error && <section className="answer-panel answer-error" role="alert">
          <span className="answer-status">Evidence service unavailable</span>
          <h2>We could not generate this brief.</h2>
          <p>{error}</p>
        </section>}

        {answer && <section className="answer-panel" aria-live="polite">
          <div className="answer-head"><div><span className="answer-status"><i /> Evidence retrieved</span><h2>{answer.question}</h2></div><span className="citation-count">{answer.citations.length} {answer.citations.length === 1 ? "source" : "sources"}</span></div>

          <div className={`answer-verdict ${answer.evidence_strength === "insufficient" ? "insufficient" : ""}`}>
            <span>Current conclusion · {formatLabel(answer.evidence_strength)} evidence</span>
            <h3>{answer.conclusion}</h3>
            {answer.insufficient_evidence_reason && <p>{answer.insufficient_evidence_reason}</p>}
          </div>

          <div className="answer-columns answer-grid">
            <div><h4>Populations studied</h4><EvidenceList items={answer.populations_studied} empty="No relevant population evidence was retrieved." /></div>
            <div><h4>Outcomes improved</h4><EvidenceList items={answer.outcomes_improved} empty="No improved outcomes were established." /></div>
            <div><h4>Not improved or unclear</h4><EvidenceList items={answer.outcomes_not_improved_or_unclear} empty="No unclear outcomes were recorded." /></div>
            <div><h4>Limitations and risks</h4><EvidenceList items={answer.limitations_and_risks} empty="No limitations were returned." /></div>
          </div>

          <div className="pilot-recommendation">
            <span>Decision recommendation</span>
            <strong>{formatLabel(answer.pilot_recommendation)}</strong>
            <div><p>Suggested pilot measures</p><div className="answer-metrics">{answer.pilot_metrics.length > 0 ? answer.pilot_metrics.map((metric) => <span key={metric}>{metric}</span>) : <span>No metrics recommended</span>}</div></div>
          </div>

          <div className="citation-box">
            <b>Source traceability</b>
            {answer.citations.length > 0
              ? <ol className="answer-citations">{answer.citations.map((citation) => <li key={citation.evidence_id}><a href={citation.url} target="_blank" rel="noreferrer">{citation.title} ↗</a><p>{citation.supported_claims.join(" · ")}</p></li>)}</ol>
              : <p>No source met the retrieval threshold. Try a more specific in-scope question or <Link href="/evidence">inspect the evidence library →</Link></p>}
          </div>
        </section>}
      </div>
    </section>
  </main>;
}
