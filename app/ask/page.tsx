"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "../../components/SiteHeader";

const example = "Should we pilot an AI companion for older adults living alone?";

export default function AskPage() {
  const [question, setQuestion] = useState(example);
  const [submitted, setSubmitted] = useState(true);
  function ask(event: FormEvent) { event.preventDefault(); setSubmitted(true); }

  return <main><SiteHeader />
    <section className="ask-layout shell">
      <aside className="ask-intro"><p className="eyebrow">Ask SUVANÉ</p><h1>Start with the decision, not the search terms.</h1><p>The current prototype answers one bounded question from a small, human-curated corpus. It shows the response contract before live RAG is connected.</p><div className="prototype-note"><b>v0 boundary</b><p>Only AI companionship, loneliness, and older-adult social connection are currently in scope.</p></div></aside>
      <div className="ask-workspace">
        <form onSubmit={ask}><label htmlFor="decision-question">Your research question</label><textarea id="decision-question" value={question} onChange={(e) => { setQuestion(e.target.value); setSubmitted(false); }} /><div className="ask-controls"><button type="button" onClick={() => { setQuestion(example); setSubmitted(false); }}>Use example</button><button className="button primary" type="submit">Generate decision brief <span>→</span></button></div></form>
        {submitted && <section className="answer-panel" aria-live="polite">
          <div className="answer-head"><div><span className="answer-status"><i /> Evidence retrieved</span><h2>{question}</h2></div><span className="citation-count">6 sources</span></div>
          <div className="answer-verdict"><span>Current conclusion</span><h3>Worth testing under controlled conditions; not ready for broad deployment.</h3><p>Evidence suggests possible benefits for engagement and perceived loneliness, but direct older-adult outcome studies remain limited. A pilot should add to—not replace—human contact and include clear safety escalation.</p></div>
          <div className="answer-columns"><div><h4>Evidence supports</h4><ul><li>Voice-first interfaces can be acceptable to older adults.</li><li>Small studies report promising loneliness outcomes.</li><li>Conversational support may improve engagement.</li></ul></div><div><h4>Evidence does not establish</h4><ul><li>Long-term clinical effectiveness</li><li>Benefit across cognitive ability levels</li><li>Safety without human oversight</li></ul></div></div>
          <div className="pilot-recommendation"><span>Decision recommendation</span><strong>Pilot with guardrails</strong><p>Track loneliness, adoption, retention, human-contact frequency, escalations, and adverse events over 8–12 weeks.</p></div>
          <div className="citation-box"><b>Why this answer is cautious</b><p>The strongest sources synthesize a still-small and heterogeneous literature. Much of the field measures usability rather than durable health outcomes. <Link href="/evidence">Inspect every source and limitation →</Link></p></div>
        </section>}
      </div>
    </section>
  </main>;
}
