# Quicknotes Architecture Plan

This document explains how we are going to move Quicknotes from a simple browser application to a real service that can handle 1 million users without crashing.

## Simple System Flow

Instead of just running inside the browser, the app will now talk to a real backend system. Here is the basic flow of the setup:

- **Step 1 (The Frontend):** The user interacts with our `index.html` web page in their browser.
- **Step 2 (The Traffic Controller):** A Load Balancer picks up the request and forwards it to an available application server so no single server gets overwhelmed.
- **Step 3 (The Application Layer):** We run multiple copies of our backend server application side-by-side to process the incoming requests.
- **Step 4 (The Database & Cache):**
  - Frequent note requests are temporarily saved in a fast **Redis Cache** so the system doesn't have to look them up from the main database every single time.
  - New notes are written directly to a primary **MySQL Database**, which syncs the data across secondary read nodes to keep loading speeds snappy.

## Why This Simple Plan Works for 1 Million Users

1.  **If the servers get slow, we add more:** Because the servers don't store files locally, we can easily turn on extra backend server copies whenever traffic spikes.
2.  **We protect the database:** Storing popular notes in the fast cache means our main database stays lightweight and responsive, preventing system slowdowns.
