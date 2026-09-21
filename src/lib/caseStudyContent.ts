export const CASE_STUDY_MARKDOWN: Record<string, string> = {
  cuerpower: `## Project Overview

CuerPOWER is a next-generation health companion engineered to bridge the gap between static workout trackers and human personal trainers. By synthesizing continuous health metrics from wearables with proprietary nutrition intelligence models, the platform delivers context-aware, empathetic, and actionable coaching in real-time.

---

## The Challenge

Generic fitness apps suffered from high churn and lacked true conversational personalization. Users needed adaptive daily encouragement and immediate answers to nutrition questions based on dynamic workout history and biometric feedback.

Key challenges included:
* **High Churn Rates:** Users abandoned traditional static logging apps within the first 14 days due to repetitive manual data entry.
* **Complex Data Silos:** Apple Health, Garmin, and Whoop biometric data streams were siloed and not actionable for real-time recommendations.
* **Latency Bottlenecks:** Off-the-shelf LLM calls took 2–4 seconds, which broke the conversational flow required for immediate meal logging and quick workout checks.

---

## The Solution & System Architecture

We architected a custom multi-agent conversational engine utilizing retrieval-augmented generation (RAG) and low-latency streaming microservices.

### Engineering Highlights

1. **Sub-350ms RAG Knowledge Engine:** Implemented vector embeddings in Milvus combined with FastAPI streaming to deliver instantaneous answers on macro targets and exercise form.
2. **Real-Time Biometric Synchronization:** Built asynchronous background pipelines aggregating Apple HealthKit and Google Health Connect metrics into dynamic daily user profiles.
3. **Computer Vision Meal Logging:** Integrated multi-modal vision models to estimate portion sizes and caloric breakdowns from a single snapshot.

---

## Measurable Impact

* **92% Active Retention:** 30-day retention increased by over 3.4x compared to industry averages.
* **4.8x Daily Interactions:** Users opened the app multiple times daily for conversational check-ins and meal feedback.
* **Sub-350ms Latency:** Zero perceived waiting time during live conversational coaching.

> “Business Evolution AI transformed our vision into an intuitive, lightning-fast product that our users genuinely engage with multiple times every single day.”
> 
> — **Marcus Vance**, Founder & CEO at CuerPOWER`,

  primeagefit: `## Project Overview

PrimeAgeFit addresses the specific physiological demands of fitness enthusiasts over 40. The platform replaces generic high-impact workout libraries with a dynamic routine generator that factors in joint history, recovery scores, and metabolic targets to optimize longevity without injury.

---

## The Challenge

Most fitness platforms focus on high-impact workouts unsuitable for mature adults. The client required an intuitive interface with strict biomechanical safety rules, progressive overload prevention, and custom AI progression curves.

Key pain points:
* **Injury Risk from Generic Routines:** Exercises with high shear forces on knees and shoulders needed automatic safe substitutions.
* **Low Follow-Through:** Users over 40 required continuous progress feedback and habit reinforcement.
* **Friction in Coaching Delivery:** Personal training advice was expensive and slow to schedule.

---

## The Solution & System Architecture

Developed a full-stack digital product and intelligent algorithmic engine that adapts exercise loads, joint-friendly workouts, and metabolic nutrition tracking for longevity-focused fitness.

### Engineering Highlights

1. **Biomechanical Substitution Engine:** Rules-based expert ML algorithm that replaces risky compound lifts with joint-safe alternatives dynamically.
2. **Next.js & Supabase Platform:** High-performance web application featuring instant workout logging, video demonstrations, and responsive charts.
3. **Automated CRM Workflows:** Bidirectional GoHighLevel integration delivering tailored SMS check-ins and recovery tips based on logged workouts.

---

## Measurable Impact

* **310% Member Growth:** Quarter-over-quarter paid subscriber expansion within 90 days of launch.
* **88% Workout Completion:** Unprecedented program adherence driven by personalized pacing.
* **4.9 Rating:** Universal acclaim across mobile web and private community members.

> “Our membership conversion skyrocketed after launching the new platform. The attention to detail and user flow is second to none.”
> 
> — **Elena Rostova**, Co-Founder at Prime Age Fit`,

  'praxis-media': `## Project Overview

Praxis Media redefines how knowledge workers interact with deep literature. By indexing entire book corpora and technical papers into vector spaces, users can pose natural language queries, generate comparative synthesis across chapters, and receive sourced citations instantly.

---

## The Challenge

Navigating complex research and lengthy books caused reader fatigue. Static PDF and e-book formats offered no contextual understanding, cross-referencing capabilities, or interactive synthesis.

Key challenges:
* **Information Overload:** Readers struggled to extract actionable takeaways from 400+ page manuscripts.
* **Loss of Context:** Traditional keyword search failed to capture conceptual relationships across distinct chapters.
* **Lack of Interactivity:** Readers wanted a conversational companion capable of debating and explaining nuanced philosophical or technical arguments.

---

## The Solution & System Architecture

Engineered a vector embedding retrieval architecture using Milvus, LangChain, and a responsive reading UI with instant chapter summaries, entity graphs, and personalized AI comprehension tutors.

### Engineering Highlights

1. **Semantic Chunking Pipeline:** Ingests EPUB, PDF, and Markdown manuscripts into contextually aware document fragments.
2. **Synchronized Split-View Reader:** Next.js interface with real-time markdown rendering and highlighted source citations.
3. **Interactive Discussion Assistant:** LangChain RAG pipeline providing chapter quizzes, debate modes, and executive briefs.

---

## Measurable Impact

* **+65% Reading Speed:** Readers synthesized complex research material over 65% faster.
* **3.4x Knowledge Retention:** Users scored significantly higher on comprehension quizzes.
* **42 Minutes / Day:** Average active daily reading and interaction time per user.

> “The platform has transformed how our readers digest dense literature. It turns passive reading into an active dialogue.”
> 
> — **Julian Thorne**, Chief Editor at Praxis AI Media`,

  'strategic-divorce-directory': `## Project Overview

Strategic Divorce Directory is an authoritative nationwide resource designed to simplify connecting families with specialized legal and financial mediators during life transitions. The platform ensures strict privacy standards while maximizing lead qualification efficiency.

---

## The Challenge

The client needed a trustworthy, lightning-fast directory platform that could handle high-intent leads, protect sensitive user confidentiality, and integrate directly with GoHighLevel marketing automations.

Key challenges:
* **High Trust Barrier:** Users facing difficult personal transitions required complete discretion and clear credentials.
* **Geographic Matching:** Law practices operate in specific jurisdictions, requiring radius and county-level filtering.
* **Lead Dispersal:** Qualified leads needed instant routing into practice CRMs without manual intervention.

---

## The Solution & System Architecture

Built a high-performance Next.js and PostgreSQL platform with multi-tiered membership subscriptions, automated review validation, and instant appointment booking workflows.

### Engineering Highlights

1. **Geo-Spatial Search:** PostGIS radius queries returning verified practitioners within 45 milliseconds.
2. **Automated Verification Pipeline:** Background validation verifying state bar licenses and practitioner credentials.
3. **Stripe & GoHighLevel Integration:** Multi-tier directory tiers with automated billing and instant lead dispatch.

---

## Measurable Impact

* **1,200+ Verified Experts:** Onboarded leading attorneys and mediators across all 50 states.
* **96% Match Rate:** Inbound clients successfully connected with relevant local counsel.
* **45ms Search Speed:** Blazing fast search response times nationwide.

> “The directory launched seamlessly on schedule. We saw immediate inbound volume and received universal praise from our listing attorneys.”
> 
> — **David Callahan**, Director of Operations at Positive Communication Systems`,

  'foreclosurebid-ai': `## Project Overview

Foreclosurebid AI empowers distressed asset funds and real estate investors with predictive intelligence. By unifying county recorder datasets, tax liens, neighborhood velocity, and satellite imagery, the platform surfaces high-alpha auction opportunities in minutes.

---

## The Challenge

Real estate auction data is fragmented across thousands of county portals with missing metadata, unrecorded liens, and volatile pricing histories, making manual valuation painfully slow and risky.

Key pain points:
* **Fragmented Datasets:** Over 3,000 county auction websites with differing schemas and scraping barriers.
* **Valuation Inaccuracies:** Generic automated valuation models (AVMs) failed to account for structural distress or municipal liens.
* **Speed to Bid:** Investors had under 24 hours between auction listing and gavel drop to finalize due diligence.

---

## The Solution & System Architecture

Developed automated ETL web scrapers, computer vision for property image inspection, and gradient-boosted pricing models to evaluate over 500,000 active foreclosures daily.

### Engineering Highlights

1. **Distributed Scraping Clusters:** Celery and Redis pipelines orchestrating headless browser fleets across 48 states.
2. **Predictive Repair Estimator:** Computer vision model trained on 1M+ MLS exterior photos to detect roof and siding degradation.
3. **Institutional Deal Screener:** Real-time financial modeling estimating max bid ceiling, title risk, and projected flip margins.

---

## Measurable Impact

* **98.4% Valuation Accuracy:** Accurate predictive modeling on final auction sale prices.
* **500,000+ Properties Daily:** Continuous real-time pipeline monitoring nationwide foreclosures.
* **-80% Deal Finding Time:** Acquisition teams cut due diligence from 6 hours to under 20 minutes per parcel.

> “Foreclosurebid AI reduced our deal evaluation timeframe from days to seconds. The data accuracy is unmatched in the industry.”
> 
> — **Harrison Reid**, Managing Partner at Beacon Hill Capital`,

  'cory-ai': `## Project Overview

CORY AI is a comprehensive enterprise operating environment where autonomous software agents execute complex multi-step standard operating procedures (SOPs). From strategy decks to operational tasking, CORY coordinates organizational intelligence into measurable execution.

---

## The Challenge

Enterprise teams lost hundreds of hours executing routine operational workflows, manually compiling status updates, and coordinating across fragmented SaaS tools without centralized intelligence.

Key pain points:
* **Workflow Fragmentation:** Teams operated across 12+ SaaS applications (Jira, Salesforce, Slack, Notion) without unified orchestration.
* **Manual SOP Overhead:** Operational managers spent 30% of their work week copying data and generating progress reports.
* **Lack of Determinism:** Traditional LLM prompts lacked deterministic guardrails needed for mission-critical enterprise tasks.

---

## The Solution & System Architecture

Constructed an event-driven agent orchestration framework with bidirectional CRM/ERP integrations, automated audit logging, and intuitive drag-and-drop workflow builders.

### Engineering Highlights

1. **Autonomous Multi-Agent Scheduler:** State machine coordinating specialized agent workers for research, drafting, and QA validation.
2. **Deterministic Guardrail Layer:** JSON Schema validation and fallback handlers ensuring 100% compliant structured outputs.
3. **Enterprise Audit Vault:** SOC2-compliant tamper-proof audit trail capturing every agent prompt, reasoning step, and tool invocation.

---

## Measurable Impact

* **74% Task Automation:** Over 70% of routine standard operating procedures executed without human intervention.
* **18 Hours Saved Weekly:** Significant reduction in manual managerial overhead per user.
* **<1 Day Deployment:** Plug-and-play connector suite allowing enterprise rollout in under 24 hours.

> “CORY AI has become the central nervous system for our team. Tasks that took days now resolve autonomously in minutes.”
> 
> — **Sarah Jenkins**, VP of Product at CORY AI Systems`,
};
