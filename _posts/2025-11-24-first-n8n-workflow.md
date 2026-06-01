---
layout: post
title: "From Audio to Actionable: Automating Competitive Intelligence"
date: 2025-12-06
tags: [n8n, Whisper, Ollama, local-LLM, PostgreSQL, automation, AI, competitive-intelligence]
---

What if you could "listen" to every podcast in your industry—without actually listening to any of them?

That's the problem I set out to solve. Companies have dozens of podcasts dropping episodes weekly. Each one contains potential gold: companies being discussed, pain points being voiced, technology trends emerging, and sales opportunities hiding in plain sight.

Manually? That's 60+ minutes of listening, note-taking, and structuring—per episode. At scale, it's impossible.

So I built a system that does it automatically.

![Infographic: a 60-minute podcast is processed in about 4 minutes — Whisper transcription, then an LLM that extracts companies, people, pain points, tech trends, opportunities, and key quotes into structured data; roughly 14 episodes per hour with no manual effort.](/images/podcast-pipeline-infographic.png)

The pipeline takes a 60-minute podcast episode and turns it into structured competitive intelligence in about four minutes, with zero manual listening — roughly 14 episodes an hour, no file-size limits.

**How it works:** an n8n workflow ingests podcast audio (50MB+ files), transcribes it with Whisper, and runs the transcript through a language model that extracts six things — companies mentioned, people and their roles, industry pain points, emerging technology trends, sales opportunities, and key attributed quotes — then writes the results out as structured data.

**A note on the stack:** this was the first iteration, built in late 2025 on a commercial cloud LLM with MongoDB storage. I've since migrated the production pipeline to a fully local stack — Ollama/Llama 3.1 for inference and PostgreSQL/pgvector for storage — removing the dependency on a commercial cloud API. That move toward on-prem, self-hosted inference is the direction the [later build]({% post_url 2026-04-12-extracting-signal-from-noise %}) carried it. The problem stayed the same; the architecture moved in-house.
