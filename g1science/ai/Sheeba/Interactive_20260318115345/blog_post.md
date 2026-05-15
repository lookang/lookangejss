---
title: "Building a Better Science Class: How We Prompted Gemini to Create a 'Fair Test' Mould Simulation"
date: "2026-03-20"
author: "Educator & AI Collaborator"
---

# Building a Better Science Class: How We Prompted Gemini to Create a 'Fair Test' Mould Simulation

In the constantly evolving landscape of EdTech, one of the biggest challenges for educators is finding interactive tools that don't just *show* a concept, but actively *teach* the scientific method. We needed a way to teach students about **Fair Testing**—the fundamental idea of changing only one variable at a time in an experiment. 

Instead of searching for a pre-made tool that might kind of fit our curriculum, we decided to build one from scratch using generative AI (Gemini). The result? A fully functional, highly interactive "Mould Growth Investigation" web app.

Here is a behind-the-scenes look at the prompt engineering journey that led from a blank page to a pedagogical science interactive.

---

## 1. The Initial Prompt: Setting the Foundation

We started with a clear, descriptive prompt to establish the core mechanics of the simulation.

**The Prompt to Gemini:**
> *"Act as an expert educational software developer. Create a single-page HTML/CSS/JS web application that simulates mould growth on bread over 7 days. There should be two bread samples (Bread A and Bread B). For each, the user can control three variables: Temperature (Warm/Room/Cold), Moisture (Dry/Damp), and Bread Type (Toasted/Not Toasted). Use emojis and a 'Comic Sans' or child-friendly font."*

**The Response:**
Gemini provided the foundational HTML structure, CSS styling, and JavaScript logic. It created the dropdowns and a basic algorithm to calculate how "mouldy" the bread would get based on the selected variables (e.g., warm + damp = maximum mould). 

While functional, we realized it was just a sandbox. It lacked *pedagogy*. A student could just click randomly without learning anything.

---

## 2. Iteration 1: Injecting the Pedagogy -> "The Fair Test"

To turn the sandbox into a lesson, we needed the simulation to evaluate the student's methodology. 

**The Prompt to Gemini:**
> *"This is great, but we need to teach 'Fair Testing'. Add a 'Run Simulation' button. When the simulation finishes, evaluate the variables the student chose. If they changed more than one variable between Bread A and Bread B, give them an error message explaining that it's NOT a fair test. If they changed exactly one variable, congratulate them and explicitly state the Independent, Controlled, and Dependent variables."*

**The Response:**
Gemini updated the JavaScript logic to include a `checkFairTest()` function. If a student made Bread A "Warm and Damp" and Bread B "Cold and Dry," the simulation now actively interrupted them with a warning: *❌ You changed 2 variables! To find out what causes mould, you must change only one thing at a time.* 

This was the breakthrough moment—the interactive was now actively teaching the scientific method!

---

## 3. Iteration 2: Scaffolding with Hypothesis and Journals

Good science requires prediction and recording of results. 

**The Prompt to Gemini:**
> *"Before they can run the simulation, force the user to make a Hypothesis predicting which bread will grow more mould. Also, add a 'Science Journal' panel at the bottom. The journal should have checklists for Temperature, Moisture, and Bread Type. When the user successfully completes a fair test on one of those variables, check it off in their journal."*

**The Response:**
Gemini immediately added a `hypothesis-section` that disabled the run button until a choice was made. It also built a persistent 'Science Journal' array in JavaScript that tracked the student's successful variables, turning the interactive into a mini-game where the goal is to "collect" all three fair tests.

---

## 4. Iteration 3: Adding Next-Level Teacher Tools (Analytics & Recording)

Finally, we wanted tools that would help teachers assess student learning and let students share their work.

**The Prompt to Gemini:**
> *"Add a 'Real-time Learning Analytics' panel that logs every action the student takes with timestamps (e.g., changing variables, running resets). Finally, add a Screen Recording button using the browser's MediaRecorder API so the student can record a video of their 7-day simulation running and download it to submit as homework."*

**The Response:**
In its final pass, Gemini integrated the `navigator.mediaDevices.getDisplayMedia` API to allow seamless, plugin-free screen recording directly inside the browser. It also added a live-updating analytics log that tracked the exact sequence of student interactions.

---

## The Final Result

Through structured, iterative prompting, we guided Gemini from generating a simple script to producing a **comprehensive educational tool**. The final interactive doesn't just animate green spots on a CSS bread div; it:
1. Forces students to hypothesize.
2. Simulates 7 days of growth.
3. Automatically grades their scientific rigorousness (Fair Test checking).
4. Records their successful methodologies in a journal.
5. Allows them to record their screen as evidence of their learning.

### The Takeaway for Educators

You no longer have to settle for interactive tools that "almost" do what you want. By acting as the pedagogical architect and using AI like Gemini as your lead developer, you can quickly build customized, highly effective learning experiences tailored exactly to your teaching objectives.

*Prompting isn't just about asking for code; it's about asking for teaching outcomes.*
