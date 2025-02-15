---
id: retrieval-augmented-generation-rag
title: "Retrieval-Augmented Generation (RAG): How It Works"
category: Generative AI
readTime: 8 min read
date: Feb 2025
author: Sanket Kakad
excerpt: Understanding how Retrieval-Augmented Generation (RAG) combines information retrieval with large language models to deliver accurate, context-aware, and up-to-date AI-generated responses.
---

## 1. What is RAG?

**RAG stands for Retrieval-Augmented Generation.**

It is an architecture that combines:

1. **Retrieval**: Find relevant information from an external knowledge source.
2. **Augmentation**: Add that information to the prompt sent to the LLM.
3. **Generation**: Let the LLM generate an answer using the retrieved information.

The basic idea is:

```text
User Question
      |
      v
   Retrieve
      |
      v
Relevant Documents
      |
      v
Add to Prompt
      |
      v
      LLM
      |
      v
    Answer
```

Instead of asking an LLM to answer entirely from what it learned during training, RAG gives the LLM relevant information at runtime.

---

# 2. Why Do We Need RAG?

Consider an LLM such as GPT.

It has learned a huge amount of information during training, but it has several limitations.

### Problem 1: Private data

Suppose your company has this document:

```text
Company Leave Policy

Employees receive 25 days of annual leave.

Employees can carry forward a maximum of 5 unused days
to the following year.
```

The LLM normally does not know this information.

RAG allows us to keep the information in an external database and retrieve it when needed.

---

### Problem 2: Frequently changing information

Imagine a company policy changes:

```text
Old policy: 25 annual leave days
New policy: 28 annual leave days
```

You do not want to retrain an LLM every time a document changes.

With RAG, you simply update the knowledge base.

---

### Problem 3: Hallucination

An LLM can sometimes produce a plausible answer even when it does not know the answer.

With RAG:

```text
User Question
      |
      v
Retrieve company policy
      |
      v
"Employees receive 28 days."
      |
      v
LLM
      |
      v
"Employees receive 28 days of annual leave."
```

The retrieved document provides grounding information.
