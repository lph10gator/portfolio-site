---
layout: post
title: "Building an AI-Powered Podcast Transcription Pipeline"
date: 2025-11-24
tags: [n8n, OpenAI, Whisper, automation]
---

Today I built my first end-to-end automation workflow using n8n - a visual workflow automation tool that lets you connect APIs and services without writing integration code.

## The Problem

I needed to monitor industry podcasts, automatically download new episodes, transcribe them, and deliver the text for analysis. Doing this manually would take hours per episode.

## The Solution

A 5-node n8n workflow:

![n8n workflow](/images/n8n-rss-transcription-workflow.png)

**How it works:**

1. **RSS Read** monitors the podcast feed for new episodes
2. **Limit** ensures we only process one episode at a time (cost control)
3. **HTTP Download** grabs the MP3 file
4. **OpenAI Whisper** transcribes audio to text ($0.006/minute)
5. **Gmail** sends me the transcript with episode title and date

## What I Learned

**File size matters.** OpenAI's Whisper API has a 25MB upload limit. Some podcasts use high-bitrate audio (48MB+ per episode), which requires either compression or local processing.

**Start with proven APIs.** I could run Whisper locally (free, no limits), but for a proof-of-concept, the cloud API is faster to validate the concept. Optimize later.

**Safety controls are essential.** Runaway automation loops can rack up unexpected charges. Built-in limits (max episodes per day, cost thresholds) prevent surprises.

## Cost Analysis

| Item | Cost |
|------|------|
| 30-minute episode | ~$0.18 |
| Weekly monitoring (2 podcasts) | ~$0.72 |
| Monthly total | ~$3.00 |

For competitive intelligence value, that's negligible.

## Next Steps

- Add Claude API integration for automated analysis and summarization
- Build weekly digest email with key insights
- Evaluate local Whisper for larger files (now that I have 32GB RAM)

---

*This is part of my transition from 15 years of government data engineering into AI automation and startup engineering. More notes to come.*
