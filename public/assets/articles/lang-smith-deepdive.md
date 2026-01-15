---
id: langsmith-deep-dive
title: "LangSmith Deep Dive: Observability, Tracing, Evaluation, and Debugging for LLM Applications"
category: Generative AI
readTime: 10 min read
date: Jan 2026
author: Sanket Kakad
excerpt: A deep dive into LangSmith for building observable, debuggable, and reliable LLM applications through tracing, monitoring, evaluation, datasets, experiments, and production debugging.
---

## 1. What is LangSmith?

**LangSmith is an observability and evaluation platform for LLM applications.**

If LangChain helps you build an AI application:

```text
LangChain
    ↓
Build the application
```

LangSmith helps you understand what that application is actually doing:

```text
LangChain / LangGraph Application
              ↓
          LangSmith
              ↓
    ┌─────────┼─────────┐
    ↓         ↓         ↓
  Traces   Evaluation  Debugging
```

This becomes particularly important when your application contains:

* LLM calls
* RAG
* tools
* agents
* multi-step workflows
* retries
* structured output
* memory
* multiple model calls

A simple application may be easy to debug with normal logs.

An agentic application is much harder.

---

# 2. Why Normal Logging Is Not Enough

Imagine your application returns:

```text
I could not find the answer.
```

Your application logs:

```text
ERROR: Request failed
```

That's not enough.

You need to know:

```text
What was the user question?

Which prompt was sent?

Which model was called?

What model parameters were used?

What did the model return?

Which documents were retrieved?

Which tools were called?

What arguments were passed to the tools?

How long did each operation take?

How many tokens were consumed?

Which step failed?
```

LangSmith gives you a structured trace of the execution.

---

# 3. The Core Mental Model

Think of LangSmith as a **flight recorder for your AI application**.

For a normal backend:

```text
Request
   ↓
Service
   ↓
Database
   ↓
Response
```

You might log:

```text
request_id
latency
status
```

For an AI application:

```text
User
 ↓
Agent
 ↓
LLM
 ↓
Retriever
 ↓
Vector DB
 ↓
LLM
 ↓
Tool
 ↓
LLM
 ↓
Answer
```

LangSmith lets you inspect that entire execution.

```text
                    LangSmith
                        |
                        v
User → Agent → LLM → Retriever → LLM → Tool → LLM
          |        |       |       |       |      |
          +--------+-------+-------+-------+------+
                         Trace
```

---

# 4. What is a Trace?

A **trace** represents an execution of your application.

For example:

```text
Trace
└── RAG Application
    ├── Retriever
    │   ├── Query embedding
    │   └── Vector search
    │
    ├── Prompt
    │
    └── LLM
        └── Response
```

A trace answers:

> What happened during this particular request?

---

# 5. Trace vs Run

You will encounter the concept of a **run**.

A run represents an individual execution of a component.

For example:

```text
Trace
│
├── Run: Retriever
├── Run: Prompt
├── Run: Chat Model
└── Run: Parser
```

An entire application request can therefore be represented as a hierarchy.

Conceptually:

```text
Parent Run
│
├── Child Run
│
├── Child Run
│   ├── Grandchild Run
│   └── Grandchild Run
│
└── Child Run
```

This hierarchy is extremely useful when debugging agents.

---

# 6. Example: Simple LLM Application

Suppose your code is:

```python
from langchain_openai import ChatOpenAI

model = ChatOpenAI(
    model="gpt-4.1-mini"
)

response = model.invoke(
    "Explain Kubernetes"
)
```

Without observability:

```text
Application
   ↓
OpenAI
   ↓
Response
```

With LangSmith tracing:

```text
Trace
└── ChatOpenAI
    ├── Input
    ├── Model
    ├── Parameters
    ├── Output
    ├── Tokens
    └── Latency
```

Now you can investigate what happened.

---

# 7. Why This Becomes More Important with RAG

Consider a RAG application:

```text
User Question
      |
      v
Query Embedding
      |
      v
Vector Search
      |
      v
Retrieved Documents
      |
      v
Prompt
      |
      v
LLM
      |
      v
Answer
```

Suppose the answer is incorrect.

There are two major possibilities.

### Retrieval failure

```text
Question
   ↓
Bad retrieval
   ↓
Wrong context
   ↓
LLM
   ↓
Wrong answer
```

### Generation failure

```text
Question
   ↓
Correct retrieval
   ↓
Correct context
   ↓
LLM
   ↓
Wrong answer
```

Without tracing, these can look identical.

LangSmith lets you inspect the individual steps.

---

# 8. Debugging a RAG Application

Suppose the user asks:

```text
How many annual leave days do employees receive?
```

The retriever returns:

```text
Password Policy
Security Policy
Remote Work Policy
```

instead of:

```text
Leave Policy
```

The LLM answers:

```text
I could not find the annual leave policy.
```

The problem is not the LLM.

The problem is:

```text
Retriever
```

A trace makes this visible.

```text
Trace
└── RAG Request
    │
    ├── Retriever
    │   ├── Query
    │   └── Retrieved Documents
    │
    ├── Prompt
    │
    └── LLM
```

You can inspect the retrieval step independently.

---

# 9. Debugging an Agent

Now consider an agent:

```text
User
 ↓
Agent
 ↓
LLM
 ↓
Tool
 ↓
LLM
 ↓
Tool
 ↓
LLM
 ↓
Answer
```

Suppose the agent chooses the wrong tool.

Without tracing:

```text
Agent failed.
```

With tracing:

```text
Trace
└── Agent
    ├── LLM
    │   └── Tool decision
    │
    ├── Tool: search_database
    │
    ├── Tool result
    │
    ├── LLM
    │   └── Tool decision
    │
    ├── Tool: search_web
    │
    └── Final LLM
```

Now you can determine exactly where the behavior went wrong.

---

# 10. LangSmith Architecture

Conceptually:

```text
                     Your Application
                            |
             +--------------+--------------+
             |                             |
             v                             v
        LangChain                       LangGraph
             |                             |
             +--------------+--------------+
                            |
                            v
                       Tracing
                            |
                            v
                        LangSmith
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
           Traces       Datasets      Evaluations
```

The application executes normally.

Tracing sends execution information to LangSmith.

LangSmith then gives you tools to inspect and evaluate the application.

---

# 11. LangSmith Is Not the LLM

This distinction is important.

```text
OpenAI / Anthropic / Google
        ↓
      Model
```

The model generates the response.

LangSmith:

```text
Application
    ↓
Observability
    ↓
Trace / Evaluate / Debug
```

LangSmith does not replace your model provider.

---

# 12. LangSmith Is Not LangChain

These are related but different.

## LangChain

Used to build application components:

```text
Models
Prompts
Tools
Retrievers
Vector Stores
Structured Output
```

## LangSmith

Used to observe and evaluate those applications:

```text
Tracing
Debugging
Datasets
Evaluation
Monitoring
```

Think:

```text
LangChain
=
Build
```

```text
LangSmith
=
Observe + Evaluate
```

---

# 13. LangSmith and LangGraph

For agentic applications:

```text
LangGraph
=
Workflow orchestration
```

```text
LangSmith
=
Observability and evaluation
```

Together:

```text
                LangGraph
                    |
                    v
             Agent Workflow
                    |
        +-----------+-----------+
        |           |           |
       LLM        Tools       RAG
        |           |           |
        +-----------+-----------+
                    |
                    v
                LangSmith
                    |
          +---------+---------+
          |                   |
        Trace              Evaluate
```

This combination is particularly useful for production agent systems.

---

# 14. Setting Up LangSmith

The basic environment configuration uses environment variables.

Conceptually:

```bash
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=your_api_key
LANGSMITH_PROJECT=my-project
```

The exact configuration can vary with SDK versions and deployment setup, so use the current LangSmith documentation when setting up a new project.

---

# 15. What is a LangSmith Project?

A project is a logical grouping of traces.

For example:

```text
Projects
│
├── development
├── staging
└── production
```

Or:

```text
Projects
│
├── customer-support
├── knowledge-assistant
└── coding-agent
```

This makes it easier to separate different applications or environments.

---

# 16. Why Separate Development and Production?

Suppose you have:

```text
my-agent-dev
my-agent-staging
my-agent-prod
```

You don't want production traces mixed with development experiments.

A common pattern is:

```text
Development
    ↓
LangSmith Project: agent-dev

Staging
    ↓
LangSmith Project: agent-staging

Production
    ↓
LangSmith Project: agent-prod
```

This makes monitoring and evaluation much easier.

---

# 17. What Information Can a Trace Contain?

A trace can contain information such as:

```text
Input
Output
Model name
Model parameters
Latency
Token usage
Errors
Metadata
Tags
Child operations
Retrieved documents
Tool calls
```

For example:

```text
Run
├── Name: answer_question
├── Input:
│   └── "What is our refund policy?"
│
├── Model:
│   └── gpt-4.1-mini
│
├── Retrieval:
│   ├── document-12
│   ├── document-31
│   └── document-42
│
├── Output:
│   └── "Refunds are allowed within 30 days."
│
└── Latency:
    └── 1.8 seconds
```

---

# 18. Metadata

Metadata allows you to attach useful application information.

For example:

```text
environment = production
customer_tier = enterprise
feature = knowledge_assistant
version = v2.4.0
```

This allows you to analyze traces by application context.

For example:

```text
Show me failures from:

environment = production
version = v2.4.0
```

---

# 19. Tags

Tags are useful for categorizing traces.

For example:

```text
rag
production
customer-support
```

A trace could have:

```text
Tags:
[
    "production",
    "rag",
    "customer-support"
]
```

Tags make filtering and analysis easier.

---

# 20. Metadata vs Tags

A useful distinction:

### Metadata

Usually represents structured information.

```text
environment = production
version = 2.1
customer_id = 123
```

### Tags

Usually represent categories.

```text
production
rag
support
```

In practice, use metadata for attributes you want to inspect as key-value data, and tags for categorical labels.

---

# 21. Latency

Latency is extremely important in AI applications.

Consider:

```text
Total: 5.4 seconds

Retriever: 200 ms
Embedding: 150 ms
LLM #1: 2.2 s
Tool: 1.1 s
LLM #2: 1.75 s
```

You can immediately see that:

```text
LLM #1
LLM #2
```

are the major contributors.

Without tracing, you might only know:

```text
API request = 5.4 seconds
```

That doesn't tell you where the problem is.

---

# 22. Token Usage

LLM applications are often token-cost sensitive.

For example:

```text
Input tokens:
4,500

Output tokens:
800
```

If an agent makes:

```text
6 LLM calls
```

the total token consumption can become significant.

Tracing helps you understand:

```text
Which calls use the most tokens?
```

and:

```text
Which prompts are unnecessarily large?
```

---

# 23. Finding Expensive Prompts

Suppose your RAG application retrieves:

```text
20 chunks
```

and sends all of them to the model.

The trace may reveal:

```text
Input tokens = 18,000
```

But perhaps only:

```text
3 chunks
```

were actually useful.

This gives you a concrete optimization opportunity:

```text
20 chunks
   ↓
Reduce to 5
   ↓
Lower token usage
   ↓
Lower cost
   ↓
Lower latency
```

---

# 24. Error Tracking

Suppose an application fails:

```text
ToolValidationError
```

A trace can show:

```text
Agent
 └── Tool Call
      ├── Input
      ├── Validation
      └── Error
```

Instead of searching through thousands of application log lines, you can inspect the failed execution.

---

# 25. Retries

Consider:

```text
LLM Call
   ↓
Timeout
   ↓
Retry
   ↓
Success
```

The trace can make the retry behavior visible.

This is particularly useful for identifying:

```text
Too many retries
Repeated tool failures
Slow dependencies
Provider instability
```

---

# 26. Evaluation

Observability answers:

> What happened?

Evaluation answers:

> Was the result good?

These are different questions.

For example:

```text
Trace:
The LLM returned an answer.
```

Evaluation:

```text
Correctness:
0.95

Relevance:
0.90

Groundedness:
0.98
```

This distinction is fundamental.

---

# 27. Why Evaluation Is Necessary

Suppose you change your prompt.

Old prompt:

```text
Answer the question using the context.
```

New prompt:

```text
Answer the question using only the context.
If the answer is unavailable, say you don't know.
```

You run your application.

It appears better.

But how do you know?

You need a test dataset.

```text
Questions
+
Expected answers
+
Documents
```

Then evaluate both versions.

---

# 28. What Is a Dataset?

A dataset is a collection of examples used to test your AI application.

For example:

```text
Dataset: HR Knowledge

1.
Question:
How many annual leave days do employees receive?

Expected:
28 days

2.
Question:
How many sick leave days are available?

Expected:
14 days

3.
Question:
Can employees work remotely?

Expected:
Up to 3 days with approval
```

You can run your application against these examples.

---

# 29. Dataset as an AI Test Suite

Think of a LangSmith dataset as similar to a test suite.

Traditional software:

```text
test_addition()
test_login()
test_payment()
```

LLM application:

```text
test_refund_policy()
test_leave_policy()
test_remote_work()
```

The difference is that LLM outputs can be probabilistic.

Therefore evaluation often uses evaluators rather than simple exact string comparison.

---

# 30. Creating an Evaluation Dataset

Suppose you have:

```text
Question
Expected Answer
```

You can store examples such as:

```text
Input:
"What is the refund period?"

Reference:
"Customers can request refunds within 30 days."
```

Then run your application against the dataset.

Conceptually:

```text
Dataset
   |
   +---- Example 1 → Application → Output
   |
   +---- Example 2 → Application → Output
   |
   +---- Example 3 → Application → Output
```

---

# 31. Evaluators

An evaluator judges an application output.

For example:

```text
Input:
What is the refund period?

Expected:
30 days

Actual:
Customers can request refunds within 30 days.
```

An evaluator might determine:

```text
Correct = true
```

Another example:

```text
Actual:
Customers have 60 days to request a refund.
```

The evaluator might produce:

```text
Correct = false
```

---

# 32. LLM-as-a-Judge

Some evaluations are difficult to implement with simple rules.

For example:

```text
Question:
Explain Kubernetes.

Answer:
Kubernetes is a container orchestration platform...
```

There may be many valid answers.

You can use another LLM to evaluate the answer.

Conceptually:

```text
             Application LLM
                    |
                    v
                 Answer
                    |
                    v
             Evaluator LLM
                    |
                    v
            Score / Feedback
```

This is commonly called **LLM-as-a-judge**.

---

# 33. Important Warning About LLM-as-a-Judge

An LLM evaluator is itself imperfect.

It can:

```text
Misjudge answers
Prefer certain writing styles
Miss subtle factual errors
Be sensitive to prompt wording
```

Therefore important evaluations should use multiple signals where practical.

For example:

```text
Exact match
+
Rule-based validation
+
LLM judge
+
Human review
```

---

# 34. RAG Evaluation

For RAG, evaluation should happen at multiple levels.

```text
                    RAG Evaluation
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
      Retrieval      Generation      Overall
```

### Retrieval

Did we retrieve the correct information?

### Generation

Did the model answer correctly using the information?

### Overall

Did the user get a useful answer?

---

# 35. Retrieval Evaluation

Suppose the correct document is:

```text
leave-policy.pdf
```

Retrieved documents:

```text
security-policy.pdf
leave-policy.pdf
remote-work.pdf
```

The relevant document was retrieved.

Good.

If instead:

```text
security-policy.pdf
password-policy.pdf
remote-work.pdf
```

are returned:

```text
Retrieval = failure
```

This should be evaluated independently of the LLM.

---

# 36. Generation Evaluation

Suppose retrieval returns:

```text
Employees receive 28 days of annual leave.
```

The model says:

```text
Employees receive 30 days.
```

Retrieval:

```text
Correct
```

Generation:

```text
Incorrect
```

This distinction is extremely important when debugging RAG.

---

# 37. Groundedness

Groundedness asks:

> Is the answer supported by the provided context?

Context:

```text
Employees receive 28 days of annual leave.
```

Answer:

```text
Employees receive 28 days of annual leave.
```

Grounded.

But:

```text
Employees receive 28 days and unlimited remote work.
```

The second claim is not supported by the context.

That is a grounding problem.

---

# 38. Faithfulness

Faithfulness is closely related to whether the generated answer is supported by the available source information.

For enterprise RAG systems, this is particularly important.

A good evaluation pipeline may therefore examine:

```text
Correctness
Relevance
Groundedness
Citation quality
```

---

# 39. Evaluation Workflow

A typical workflow is:

```text
Dataset
   |
   v
Application
   |
   v
Generated Outputs
   |
   v
Evaluators
   |
   +---- Correctness
   +---- Relevance
   +---- Groundedness
   +---- Custom metrics
   |
   v
Scores
```

You can compare application versions.

---

# 40. Prompt Version Comparison

Suppose:

```text
Version A
Prompt v1
```

produces:

```text
Correctness = 82%
```

You modify the prompt.

```text
Version B
Prompt v2
```

produces:

```text
Correctness = 89%
```

Now you have evidence that the change improved the application on the evaluation dataset.

This is much better than saying:

```text
"I think the new prompt is better."
```

---

# 41. Experimentation

A useful development cycle is:

```text
Build
 ↓
Run
 ↓
Trace
 ↓
Evaluate
 ↓
Modify
 ↓
Run again
 ↓
Compare
```

This is the core development loop for reliable LLM applications.

---

# 42. Traditional Software vs LLM Software

Traditional development:

```text
Write Code
 ↓
Unit Tests
 ↓
Integration Tests
 ↓
Deploy
 ↓
Monitor
```

LLM application development:

```text
Build Prompt / Workflow
 ↓
Run Traces
 ↓
Evaluate Outputs
 ↓
Inspect Failures
 ↓
Modify
 ↓
Evaluate Again
 ↓
Deploy
 ↓
Monitor Production
```

The evaluation loop becomes much more important because outputs are not always deterministic.

---

# 43. Production Monitoring

Once your application is deployed, you need to monitor real user traffic.

For example:

```text
Production
    |
    v
LangSmith
    |
    +---- Latency
    +---- Errors
    +---- Token usage
    +---- Model usage
    +---- Tool failures
    +---- Retrieval behavior
```

This allows you to detect regressions that did not appear in development.

---

# 44. Development vs Production

A good setup is:

```text
                Application
                    |
          +---------+---------+
          |                   |
          v                   v
     Development          Production
          |                   |
          v                   v
   LangSmith Project     LangSmith Project
      agent-dev             agent-prod
```

Development traces help you debug.

Production traces help you monitor real behavior.

---

# 45. Sampling Production Traces

Production applications may generate a huge number of traces.

For example:

```text
10,000 requests/hour
```

Sending every possible detail to observability infrastructure may be unnecessary.

A production design may use:

```text
100% error traces
+
Selected successful traces
+
Evaluation samples
```

The exact strategy depends on your observability and compliance requirements.

---

# 46. Privacy and Sensitive Data

This is a critical consideration.

Traces can contain:

```text
User questions
LLM prompts
LLM outputs
Retrieved documents
Tool arguments
Customer information
```

Therefore you should treat tracing data as potentially sensitive.

Before enabling production tracing, determine:

```text
What data is being captured?

Who can access it?

How long is it retained?

Are secrets being logged?

Are customer identifiers included?

Do you need redaction?
```

Never put API keys or passwords into prompts or trace metadata.

---

# 47. PII Considerations

Suppose a user sends:

```text
My name is John Smith.
My passport number is XXXXX.
```

If the complete request is traced, sensitive information may appear in your observability system.

Therefore production applications may need:

```text
Redaction
Filtering
Anonymization
Access controls
Retention policies
```

Observability should not bypass your application's data protection requirements.

---

# 48. Cost Monitoring

An AI application can become expensive without obvious infrastructure problems.

For example:

```text
Request
 ↓
Agent
 ↓
LLM call #1
 ↓
Retriever
 ↓
LLM call #2
 ↓
Tool
 ↓
LLM call #3
```

Each model call can consume tokens.

Tracing lets you investigate:

```text
Token usage per request
Token usage per model
Token usage per workflow
```

This helps answer:

> Why did our AI application's monthly model bill increase?

---

# 49. Latency Optimization with Traces

Suppose:

```text
Total latency = 7 seconds
```

Trace:

```text
Retriever       200ms
LLM #1          1.5s
Tool            400ms
LLM #2          1.2s
Reranker        500ms
LLM #3          3.2s
```

Now the optimization target is obvious:

```text
LLM #3
```

You might investigate:

```text
Why is this call taking 3.2 seconds?
```

Without tracing, you only know:

```text
API = 7 seconds
```

---

# 50. Debugging Prompt Problems

Suppose your prompt template is:

```text
You are an assistant.

Context:
{context}

Question:
{question}
```

But `{context}` contains:

```text
20 large documents
```

The trace lets you inspect the actual rendered prompt.

You may discover:

```text
Input tokens:
18,500
```

Then optimize:

```text
20 documents
      ↓
Reranking
      ↓
Top 5 documents
      ↓
4,500 tokens
```

This is one of the most practical uses of tracing.

---

# 51. Debugging Tool Calls

Suppose you define:

```text
get_customer(customer_id)
```

The agent calls:

```json
{
  "customer_id": "12345"
}
```

But your application expects:

```text
integer
```

The trace can reveal:

```text
Tool input
    ↓
Validation error
```

You can then improve:

```text
Tool schema
Prompt
Model selection
Validation
```

---

# 52. Debugging Agent Loops

Agents can sometimes get stuck:

```text
Agent
 ↓
Tool A
 ↓
Agent
 ↓
Tool A
 ↓
Agent
 ↓
Tool A
```

A trace makes the loop visible.

You can then investigate:

```text
Why is the agent repeatedly choosing Tool A?
```

Possible causes:

```text
Poor tool description
Missing state
Bad prompt
Tool result ambiguity
Incorrect routing logic
```

---

# 53. LangSmith and Structured Output

Suppose your application expects:

```python
class Customer(BaseModel):
    name: str
    age: int
```

but the model returns invalid data.

The trace can show:

```text
LLM Output
     ↓
Structured Output Parser
     ↓
Validation Error
```

This helps you determine whether the problem is:

```text
Model output
```

or:

```text
Schema / parsing
```

---

# 54. LangSmith and RAG

A RAG trace can be thought of as:

```text
Trace
│
├── User Query
│
├── Query Embedding
│
├── Retriever
│   ├── Document 1
│   ├── Document 2
│   └── Document 3
│
├── Prompt
│
├── LLM
│
└── Answer
```

This gives you visibility into the entire RAG pipeline.

---

# 55. LangSmith and Agentic RAG

Now imagine:

```text
User
 ↓
Agent
 ↓
Determine whether search is needed
 ↓
Retriever
 ↓
Documents
 ↓
LLM
 ↓
Tool
 ↓
LLM
 ↓
Answer
```

A trace can capture the whole workflow.

This is where observability becomes essential.

---

# 56. LangSmith and LangGraph State

LangGraph applications are stateful.

For example:

```text
State
{
    messages: [...],
    customer_id: 123,
    retrieved_documents: [...],
    approval_required: true
}
```

The graph might execute:

```text
START
  ↓
Classify
  ↓
Retrieve
  ↓
Generate
  ↓
Human Approval
  ↓
Execute
  ↓
END
```

Tracing helps you inspect how the application moved through this workflow.

---

# 57. Human-in-the-Loop

Suppose an agent wants to perform:

```text
Delete production database record
```

Your architecture may require:

```text
Agent
 ↓
Decision
 ↓
Human Approval
 ↓
Tool
```

Observability should capture:

```text
Agent decision
 ↓
Approval request
 ↓
Human decision
 ↓
Tool execution
```

This becomes important for auditing high-risk workflows.

---

# 58. Custom Application Logic

You don't have to limit observability to LangChain components.

A real application might contain:

```text
FastAPI
 ↓
Authentication
 ↓
Business Logic
 ↓
LangGraph
 ↓
LangChain
 ↓
Database
```

You want enough tracing around important application boundaries to understand the complete request.

Conceptually:

```text
API Request
   |
   v
Application Service
   |
   v
AI Workflow
   |
   v
External Services
```

---

# 59. Trace Hierarchy

A useful mental model is a tree.

```text
Request
│
└── AI Workflow
    │
    ├── Classifier
    │   └── LLM
    │
    ├── Retrieval
    │   ├── Embedding
    │   └── Vector Search
    │
    ├── Generation
    │   └── LLM
    │
    └── Tool
        └── Database
```

This is far more informative than:

```text
INFO request completed
```

---

# 60. Evaluation + Tracing Together

The real power comes from combining both.

Tracing tells you:

```text
What happened?
```

Evaluation tells you:

```text
Was it good?
```

Together:

```text
                 AI Application
                       |
          +------------+------------+
          |                         |
          v                         v
       Tracing                  Evaluation
          |                         |
          v                         v
      Execution                 Quality
          |                         |
          +------------+------------+
                       |
                       v
                 Improvement
```

---

# 61. The LLM Application Development Loop

A mature workflow looks like:

```text
                    ┌──────────────┐
                    │    Build    │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │    Trace     │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   Evaluate   │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   Analyze    │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │    Improve   │
                    └──────┬───────┘
                           |
                           └──────────→ Build
```

This feedback loop is one of the most important ideas in production GenAI engineering.

---

# 62. LangSmith for Regression Testing

Suppose you have a production RAG application.

You change:

```text
Chunk size
Embedding model
Retriever
Prompt
LLM
```

Any of these can change behavior.

You should run your evaluation dataset again.

```text
Before change
    ↓
Evaluation
    ↓
Scores

After change
    ↓
Evaluation
    ↓
Scores
```

Compare:

```text
                    Before    After

Correctness           91%       94%
Groundedness          96%       97%
Retrieval Recall      88%       92%
Latency               1.8s      2.1s
```

Now you can make an informed decision.

---

# 63. Experiment Tracking

An experiment can represent:

```text
Application Version
+
Dataset
+
Configuration
+
Evaluation Results
```

For example:

```text
Experiment A
-------------
Model: model-A
Chunk size: 500
Top K: 5
Prompt: v1

Score: 0.84
```

Experiment B:

```text
Model: model-A
Chunk size: 700
Top K: 5
Prompt: v2

Score: 0.89
```

Now you have measurable evidence.

---

# 64. Why This Matters for RAG

RAG has many configurable variables:

```text
Chunk size
Chunk overlap
Embedding model
Vector database
Top K
Metadata filters
Reranker
Prompt
LLM
Temperature
```

Changing any one of them can affect quality.

LangSmith provides a useful environment for comparing these changes against datasets and traces.

---

# 65. A Production RAG Development Strategy

A practical process is:

### Step 1

Build a basic RAG system.

```text
Documents
 ↓
Embeddings
 ↓
Vector DB
 ↓
Retriever
 ↓
LLM
```

### Step 2

Enable tracing.

```text
RAG
 ↓
LangSmith
```

### Step 3

Collect representative questions.

```text
Dataset
```

### Step 4

Evaluate.

```text
Retrieval
+
Generation
```

### Step 5

Improve retrieval.

```text
Chunking
Top K
Metadata
Reranking
```

### Step 6

Improve generation.

```text
Prompt
Model
Context formatting
```

### Step 7

Deploy.

```text
Production
 ↓
LangSmith monitoring
```

---

# 66. LangSmith in a Production Architecture

A realistic architecture could look like:

```text
                       Users
                         |
                         v
                    Next.js App
                         |
                         v
                    FastAPI API
                         |
                         v
                  AI Application
                         |
             +-----------+-----------+
             |           |           |
             v           v           v
          LangGraph   Retriever    Tools
             |           |           |
             v           v           v
            LLM      Vector DB     APIs
             |
             |
             +----------------------+
                                    |
                                    v
                               LangSmith
                                    |
                 +------------------+------------------+
                 |                  |                  |
                 v                  v                  v
              Traces            Evaluation         Monitoring
```

LangSmith sits beside your application rather than being the core execution engine.

---

# 67. Self-Hosted LangSmith

LangSmith also has deployment options beyond the hosted service.

For example, the official documentation describes self-hosting LangSmith on infrastructure such as Azure AKS using Terraform and Helm. A production-oriented deployment can involve PostgreSQL, Redis, object storage, Kubernetes, ingress, and other supporting infrastructure.

Conceptually:

```text
                   Your Cloud
                       |
                       v
                     AKS
                       |
              ┌────────┴────────┐
              |                 |
              v                 v
         LangSmith          Supporting
          Services          Infrastructure
                                |
                    +-----------+-----------+
                    |           |           |
                 Postgres     Redis       Storage
```

This is a significantly more operationally complex option than using the hosted platform.

---

# 68. When Would You Self-Host?

Self-hosting can make sense when you have requirements around:

```text
Data residency
Network isolation
Enterprise infrastructure
Security controls
Internal deployment requirements
Operational ownership
```

But self-hosting also means you own more infrastructure.

You need to manage:

```text
Kubernetes
Database
Redis
Storage
TLS
Networking
Backups
Upgrades
Scaling
Monitoring
Security
```

Therefore:

> Do not self-host simply because you can. Choose it when your requirements justify the operational cost.

---

# 69. What LangSmith Does Not Automatically Solve

LangSmith does not automatically guarantee:

```text
Correct answers
No hallucinations
Good RAG retrieval
Secure tools
Correct agent behavior
Low cost
Low latency
```

It gives you visibility and evaluation mechanisms.

You still need good engineering.

For example:

```text
Bad RAG
   ↓
LangSmith
   ↓
You can see that it is bad
```

LangSmith does not automatically redesign the RAG system for you.

---

# 70. Common Beginner Mistakes

## Mistake 1: Treating tracing as logging

Tracing is more useful when it represents the relationship between operations.

```text
Agent
 ├── LLM
 ├── Retriever
 └── Tool
```

rather than unrelated log messages.

---

## Mistake 2: Only monitoring production errors

You should also inspect successful requests.

A successful response can still be:

```text
Incorrect
Expensive
Slow
Poorly grounded
```

---

## Mistake 3: Evaluating only final answers

For RAG:

```text
Final answer
```

is not enough.

Evaluate:

```text
Retrieval
+
Generation
```

---

## Mistake 4: No evaluation dataset

Without representative test cases, you cannot reliably determine whether a change improved the system.

---

## Mistake 5: Ignoring sensitive data

Tracing can expose the same information your application processes.

Treat observability data as production data.

---

# 71. LangSmith vs Traditional APM

Traditional APM tools monitor:

```text
CPU
Memory
HTTP
Database
Latency
Errors
```

These are still important.

LLM applications additionally need:

```text
Prompt
Model
Tokens
Tool calls
Retrieved context
Agent decisions
Evaluation scores
```

Therefore the two categories complement each other.

```text
                 Production AI
                       |
          +------------+------------+
          |                         |
          v                         v
      Traditional APM          LangSmith
          |                         |
          v                         v
      Infrastructure          AI behavior
```

A production AI system may need both.

---

# 72. APM + LangSmith

For example:

```text
                    User
                      |
                      v
                   API
                      |
          +-----------+-----------+
          |                       |
          v                       v
      Datadog/APM             LangSmith
          |                       |
          v                       v
Infrastructure              LLM behavior
Database                    Retrieval
Network                     Tools
CPU                         Evaluation
Memory                      Tokens
```

This gives you a much more complete operational picture.

---

# 73. A Useful Debugging Example

Imagine a customer asks:

```text
Why was my refund rejected?
```

The application returns:

```text
Your refund was rejected because it was submitted
after 30 days.
```

The customer complains that this is incorrect.

You inspect the LangSmith trace:

```text
Trace
└── Customer Support Agent
    │
    ├── Customer Lookup
    │   └── Customer #123
    │
    ├── Policy Retrieval
    │   └── Refund Policy 2025
    │
    ├── LLM
    │   └── "Refunds after 30 days are rejected."
    │
    └── Answer
```

You discover:

```text
Retrieved policy:
2025 version
```

But the current policy is:

```text
2026 version
```

The problem is not the model.

The actual problem is:

```text
Stale retrieval data
```

This is exactly the kind of issue observability helps expose.

---

# 74. LangSmith + CI/CD

You can integrate evaluation into your development process.

Conceptually:

```text
Developer
   |
   v
Git Push
   |
   v
CI Pipeline
   |
   v
Run Evaluation Dataset
   |
   v
Evaluation Score
   |
   +---- Pass → Deploy
   |
   +---- Fail → Stop
```

For example:

```text
Minimum correctness = 90%

Current version = 94%
```

Deployment can continue.

But:

```text
Current version = 83%
```

The pipeline can fail.

This brings software engineering discipline into LLM application development.

---

# 75. LLM Application CI/CD

A mature pipeline can look like:

```text
Code
 |
 v
Unit Tests
 |
 v
Integration Tests
 |
 v
RAG Evaluation
 |
 v
Agent Evaluation
 |
 v
Security Checks
 |
 v
Build Container
 |
 v
Deploy
```

This is much stronger than:

```text
Code
 ↓
Deploy
```

---

# 76. LangSmith as an AI Development Platform

The easiest way to remember LangSmith is:

```text
                   LangSmith
                       |
        +--------------+--------------+
        |              |              |
        v              v              v
    Observe         Evaluate        Improve
        |              |              |
        v              v              v
     Traces         Datasets       Experiments
```

The goal is not merely to see logs.

The goal is to create a feedback loop for improving AI systems.

---

# 77. The Relationship Between the Main Tools

A useful mental model for the modern LangChain ecosystem is:

```text
                 AI Application
                       |
              ┌────────┴────────┐
              |                 |
         LangChain          LangGraph
              |                 |
       Building blocks      Workflows
              |                 |
              +--------+--------+
                       |
                       v
                  LangSmith
                       |
        +--------------+--------------+
        |              |              |
      Trace          Evaluate       Monitor
```

### LangChain

Provides components.

```text
Model
Prompt
Retriever
Tool
Parser
```

### LangGraph

Provides orchestration.

```text
State
Nodes
Edges
Loops
Human approval
Persistence
```

### LangSmith

Provides observability and evaluation.

```text
Traces
Datasets
Experiments
Evaluation
Monitoring
```

---

# 78. The Most Important Concepts to Learn

If you are learning LangSmith for a GenAI engineering role, focus on these concepts:

```text
1. Traces
2. Runs
3. Projects
4. Metadata
5. Tags
6. Inputs / Outputs
7. Token usage
8. Latency
9. Errors
10. Datasets
11. Evaluators
12. LLM-as-a-judge
13. RAG evaluation
14. Experiments
15. Production monitoring
16. Privacy / redaction
17. LangGraph tracing
18. CI/CD evaluation
```

You do not need to memorize every API.

Understand what problem each concept solves.

---

# 79. The Complete Mental Model

Think of a production GenAI system like this:

```text
                         USER
                           |
                           v
                     APPLICATION
                           |
                           v
                    LangChain /
                    LangGraph
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
         LLM            Retrieval          Tools
          |                |                |
          +----------------+----------------+
                           |
                           v
                        Answer
                           |
                           v
                         USER


              OBSERVABILITY / EVALUATION
                           |
                           v
                       LangSmith
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
        Traces          Datasets        Evaluation
          |                |                |
          +----------------+----------------+
                           |
                           v
                       Improvement
```

---

# 80. Final Mental Model

There are four different questions you should ask when building an AI application.

### Question 1

> **Can I build the workflow?**

Use:

```text
LangChain
LangGraph
```

### Question 2

> **What happened during execution?**

Use:

```text
LangSmith Tracing
```

### Question 3

> **Was the answer actually good?**

Use:

```text
LangSmith Evaluation
```

### Question 4

> **Did the latest version improve the application?**

Use:

```text
Datasets
+
Experiments
+
Evaluation
```

Therefore:

```text
                  GenAI Engineering
                         |
        +----------------+----------------+
        |                |                |
        v                v                v
      Build            Observe          Evaluate
        |                |                |
        v                v                v
   LangChain/         LangSmith        LangSmith
   LangGraph          Tracing          Evaluation
```

The most important idea is this:

> **LangSmith turns an LLM application from a black box into an observable and measurable system.**

For a simple chatbot, you might survive without it.

For a production RAG or agentic system with multiple LLM calls, retrieval, tools, state, retries, and real users, observability and evaluation become much more important.

The engineering loop becomes:

```text
Build
  ↓
Trace
  ↓
Debug
  ↓
Evaluate
  ↓
Experiment
  ↓
Improve
  ↓
Deploy
  ↓
Monitor
  ↓
Repeat
```

That feedback loop is the real value of LangSmith.
