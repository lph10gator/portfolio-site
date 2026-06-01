---
layout: post
title: "From Requirements Matching to Competitive Intelligence: The Same Problem, Better Tools"
date: 2026-04-12
tags: [n8n, Python, pgvector, LLM, Ollama, PostgreSQL, NLP, RAG, semantic-search, automation, competitive-intelligence]
excerpt: "Every role I've had has been the same problem with more powerful tools. I didn't stumble into AI pipeline work — it found me."
---

Every role I've had has been the same problem with more powerful tools.

I didn't stumble into AI pipeline work. It found me — because I've been solving this class of problem for years without having a name for it.

---

## The Pattern I Didn't See Coming

In my earlier contract years I was building Access databases and VBA macros for Navy and USMC clients. The work looked simple on the surface: take siloed data that no one could make sense of, clean it up, connect it, and give leadership visibility they didn't have before.

A $628M budget trapped in disconnected Excel files. 170 million data points across depot systems with no unified view. Lessons learned that lived in email threads and died there.

The problem was always the same: **signal buried in noise, manual work standing between the data and the decision.**

VBA and Access were the right tools for that scale. I used them well. But I was already solving an extraction problem — I just didn't know it yet.

---

## NP2: The Same Problem, Bigger Stakes

For most of my time at Millennium I worked the Navy Personnel and Pay (NP2) program — a federal modernization effort with a master set of roughly **30,000 requirements**, depending on how you counted them. I came in as a test analyst and, before long, became the de-facto data person for the testing team.

Working that data, I found the gap: about **4,000 requirements** had never been matched to a test case. They'd slipped through. On a program that size, closing that gap by hand was a 3–4 month slog.

In **late 2025** I automated it. I built a Python NLP pipeline that applied:

- **Jaccard similarity scoring** to measure requirement-to-test-case overlap
- **Hierarchical clustering** to group related requirements
- **Context-aware topic extraction** to pull meaning from dense technical language
- **Adaptive acronym harvesting** — 633 Navy-specific terms at 98% extraction accuracy

The result: matching those ~4,000 orphaned requirements dropped from a 3–4 month manual effort to under 2 hours — a **98% reduction**. Analysts validated roughly **50% faster**. Traceability confidence climbed from **60–70% to 75–85%**.

*(The work ran on proprietary U.S. Navy data. I can describe the architecture and the results — but not the source data itself.)*

I called it an NLP automation platform at the time. Looking back, I'd describe it a little differently.

---

## What I'd Call It Now

Today I'd recognize what I built as the **retrieval-and-ranking layer that sits at the front of every modern RAG and semantic-search system** — I was solving it by hand before vector databases made it easy.

The machinery was the same kind RAG depends on:

- Ingest a collection of documents (requirements)
- Extract meaning and structure from dense technical text
- Score similarity and relevance
- Surface the best matches to a human analyst

What I *didn't* have was the generation step — no LLM producing output from the retrieved context. That came later, at Autyvia. But the retrieval half — find the most relevant items by similarity — is exactly what I'd soon be doing with vector embeddings instead of hand-tuned Jaccard scoring.

The tools were classical Python NLP libraries. The retrieval problem was timeless.

---

## Autyvia: The Same Problem, Modern Stack

Right after the NP2 program wound down, I joined Autyvia in December 2025 — an architecture, engineering, and construction (AEC) intelligence startup — to build their competitive intelligence pipeline from the ground up.

The problem statement was immediately familiar: **extract signal from noise at scale and eliminate manual work.**

This time the content isn't Navy requirements — it's 500+ weekly content items from RSS feeds, YouTube channels, podcasts, and industry association websites. The extraction target isn't test case matches — it's companies, people, pain points, technology trends, and newsletter hooks.

The approach maps directly:

| NP2 — classical NLP (2025) | Autyvia — LLM stack (2025–present) |
|---|---|
| Python NLP pipeline | Python + n8n orchestration |
| Jaccard similarity | pgvector cosine similarity |
| Hierarchical clustering | HDBSCAN semantic clustering |
| Domain acronym extraction | LLM entity extraction (Ollama/Llama 3.1) |
| Manual analyst review | Automated delivery to SharePoint + Teams |

The concepts transferred directly. The implementation evolved — and this time I added the generation and entity-extraction step the earlier system never had.

What used to require hand-tuned similarity functions now uses vector embeddings. What used to require manual review now runs on a schedule and delivers to the editorial team automatically.

---

## The Stack Today

The production pipeline I maintain at Autyvia:

- **Ingestion:** RSS feeds, YouTube RSS, podcast sources, config-driven Python scrapers for industry associations
- **Processing:** Ollama/Llama 3.1 running locally for relevance scoring, entity extraction, and structured JSON output
- **Storage:** PostgreSQL with pgvector for semantic search and clustering
- **Orchestration:** 15+ n8n workflows handling ingestion, deduplication, LLM processing, and delivery
- **Delivery:** Automated export to SharePoint and Microsoft Teams via Graph API
- **Infrastructure:** Docker containerized on-prem, OAuth2/Azure AD for Microsoft 365 integrations

Zero manual steps in the weekly delivery cycle.

---

## The Through-Line

VBA/Access → Python NLP → LLM pipelines with pgvector.

Each transition felt like learning something new. Looking back, it was the same skill deepening — pattern recognition, extraction, automation — applied to increasingly complex problems with increasingly powerful tools. The problem never changed. The tools finally caught up to it.

If you're looking for someone who thinks this way about data problems — and has the production pipeline to show for it — I'm open to conversations about what's next.

— Linton
