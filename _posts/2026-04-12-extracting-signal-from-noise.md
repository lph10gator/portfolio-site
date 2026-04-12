---
layout: post
title: "From Requirements Matching to Competitive Intelligence: The Same Problem, Better Tools"
date: 2026-04-12
tags: [n8n, Python, pgvector, LLM, Ollama, PostgreSQL, NLP, RAG, automation, competitive-intelligence]
excerpt: "Every role I've had has been the same problem with more powerful tools. I didn't stumble into AI pipeline work — it found me."
---

Every role I've had has been the same problem with more powerful tools.

I didn't stumble into AI pipeline work. It found me — because I've been solving this class of problem for years without having a name for it.

---

## The Pattern I Didn't See Coming

Back in 2017, I was building Access databases and VBA macros for Navy and USMC clients. The work looked simple on the surface: take siloed data that no one could make sense of, clean it up, connect it, and give leadership visibility they didn't have before.

A $628M budget trapped in disconnected Excel files. 170 million data points across depot systems with no unified view. Lessons learned that lived in email threads and died there.

The problem was always the same: **signal buried in noise, manual work standing between the data and the decision.**

VBA and Access were the right tools for that scale. I used them well. But I was already solving an extraction problem — I just didn't know it yet.

---

## Millennium: NLP at Scale

By 2023 I was working on something bigger: the Navy Personnel and Pay (NP2) program, a federal modernization effort processing 10,000+ requirements that needed to be matched to test cases.

The manual process took analysts 3–4 months per cycle. My job was to make that faster.

I built a Python-based NLP platform that applied:
- **Jaccard similarity scoring** to measure requirement overlap
- **Hierarchical clustering** to group related requirements
- **Context-aware topic extraction** to pull meaning from dense technical language
- **Adaptive acronym harvesting** — 633 Navy-specific terms with 98% extraction accuracy

The result: validation time dropped from 3–4 months to under 2 hours. A 98% reduction. Analysts validated requirements 50% faster. Traceability confidence went from 60–70% to 75–85%.

I called it an NLP automation platform at the time. Looking back, I'd call it something else.

---

## What I'd Call It Now

What I built at Millennium was a primitive RAG system.

I didn't have that vocabulary then. But the architecture was the same:
- Ingest a collection of documents (requirements)
- Extract meaning and structure from text
- Score similarity and relevance
- Surface the right matches to a human analyst

That's retrieval-augmented generation without the generation step. The retrieval and augmentation were all there.

The tooling was 2023-era Python and NLP libraries. The concept was timeless.

---

## Autyvia: The Same Problem, Modern Stack

In late 2025 I joined Autyvia, an architecture, engineering, and construction (AEC) intelligence startup, to build their competitive intelligence pipeline from the ground up.

The problem statement was immediately familiar: **extract signal from noise at scale and eliminate manual work.**

This time the content isn't Navy requirements — it's 500+ weekly content items from RSS feeds, YouTube channels, podcasts, and industry association websites. The extraction target isn't test case matches — it's companies, people, pain points, technology trends, and newsletter hooks.

The architecture maps directly:

| Millennium (2023) | Autyvia (2025–present) |
|---|---|
| Python NLP pipeline | Python + n8n orchestration |
| Jaccard similarity | pgvector cosine similarity |
| Hierarchical clustering | HDBSCAN semantic clustering |
| Domain acronym extraction | LLM entity extraction (Ollama/Llama 3.1) |
| Manual analyst review | Automated delivery to SharePoint + Teams |

The concepts transferred directly. The implementation evolved.

What used to require hand-tuned similarity functions now uses vector embeddings. What used to require manual review pipelines now runs on a schedule and delivers to the editorial team automatically. What used to take 3–4 months now runs every Monday morning.

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

Each transition felt like learning something new. Looking back, it was the same skill deepening — pattern recognition, extraction, automation — applied to increasingly complex problems with increasingly powerful tools.

If you're looking for someone who thinks this way about data problems — and has the production pipeline to show for it — I'm open to conversations about what's next.

— Linton
