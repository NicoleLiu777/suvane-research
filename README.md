# SUVANÉ Research

![SUVANÉ Research — Evidence to decision](public/og.jpg)

**A human-in-the-loop evidence-to-decision workspace for AI-enabled healthy aging.**

[Live prototype](https://suvane-research.oliviaralph89.chatgpt.site) · Built as an AI Implementation / Technical Product / FDE case study

## The problem

Health product and care teams do not need another research feed. They need to know what the evidence means for a real decision:

> Should we pilot an AI companion for older adults living alone?

SUVANÉ Research turns a bounded professional question into a structured, traceable decision brief:

**Question → Retrieval → Evidence grading → Synthesis → Pilot recommendation → Source traceability**

## What the current prototype does

- Presents a decision brief with a calibrated conclusion and evidence-strength label
- Separates promising findings from unresolved risks
- Converts research into a measurable 8–12 week pilot recommendation
- Normalizes source records by population, intervention, outcomes, limitations, and implementation meaning
- Supports evidence search and strength filtering
- Keeps every evidence record linked to its original source
- Documents the product-discovery, architecture, evaluation, and human-review workflow

The current `v0.1` uses a small, human-curated corpus. The Ask experience demonstrates the response contract before live retrieval-augmented generation is connected.

## Product surfaces

| Route | Purpose |
| --- | --- |
| `/` | Decision brief and pilot recommendation |
| `/evidence` | Searchable, normalized evidence library |
| `/ask` | Structured evidence-to-decision answer prototype |
| `/case-study` | Discovery, architecture, safeguards, and evaluation plan |

## Evidence schema

Each source is converted into a consistent record:

```ts
type EvidenceRecord = {
  title: string;
  authors: string;
  year: number;
  type: string;
  population: string;
  intervention: string;
  outcomes: string[];
  strength: "Moderate" | "Limited" | "Early";
  takeaway: string;
  limitation: string;
  implication: string;
  url: string;
};
```

## Human-in-the-loop safeguards

The intended system can organize and summarize evidence inside a fixed schema, but it must not:

- diagnose or prescribe;
- hide uncertainty or unsupported claims;
- assign evidence strength without source-based rules;
- publish a decision brief without review.

The planned audit trail records the source set, retrieval run, prompt, model output, evaluation results, and approval state.

## Technical direction

### Current product surface

- Next.js-compatible App Router
- React 19 + TypeScript
- Tailwind CSS
- Vinext / Vite
- Cloudflare-compatible deployment output

### Planned retrieval core

- FastAPI modular monolith
- PostgreSQL + pgvector
- Document ingestion and chunking worker
- Structured evidence records and decision briefs
- Citation verification and insufficient-evidence refusal
- Human review and audit events

## Run locally

Prerequisites: Node.js `22.13.0` or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

Production build:

```bash
npm run build
```

## Project structure

```text
app/
  ask/              Structured answer prototype
  case-study/       FDE implementation story
  evidence/         Evidence library and filters
  globals.css       Site-wide visual system
  layout.tsx        Metadata and social preview
  page.tsx          Decision brief
components/
  SiteHeader.tsx
data/
  evidence.ts       Normalized evidence records
public/
  og.png            Social preview card
```

## Evaluation plan

The RAG phase will be evaluated on:

1. **Retrieval coverage** — were the sources needed for the answer retrieved?
2. **Citation correctness** — does each citation support the associated claim?
3. **Groundedness** — are material claims supported by the retrieved corpus?
4. **Calibration** — does confidence decrease when evidence quality or coverage is weak?
5. **Decision utility** — can a professional identify the next responsible action?

## Roadmap

- [x] Professional decision surface
- [x] Normalized evidence schema
- [x] Searchable evidence library
- [x] Structured Ask response contract
- [x] FDE case-study page
- [ ] Connect the existing RAG prototype
- [ ] Add mandatory claim-level citations
- [ ] Add insufficient-evidence refusal
- [ ] Build a 10–20 question evaluation set
- [ ] Add human review and audit logging
- [ ] Publish evaluation results and a two-minute product demo

## Scope

SUVANÉ Research is a research and product-decision support prototype. It is not a medical device and does not provide diagnosis, treatment, or individual medical advice.
