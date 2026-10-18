# Quicknotes System Design (Capstone Project)

A production-ready, highly interactive frontend interface built to demonstrate client-server synchronization, dynamic state handling, and robust input validation. This project transitions Quicknotes from a browser-only application into a real online service scaled to mock handling 1 million concurrent users across Kenya.

---

## Kenyan Context & Design Parameters

This iteration builds out system resilience optimized for local connectivity profiles. Test suites use highly relevant local engineering data models (such as tracking M-Pesa sandbox endpoints and Konza Technopolis server logs) alongside native Swahili interface prompts for clear end-user accessibility.

---

## Project Requirements Addressed

### 1. Structural Architecture

All application files live cleanly inside the mandated directory structure:

- [docs/index.html](./docs/index.html) — Containing valid HTML5 semantic layout structures.
- [docs/style.css](./docs/style.css) — Core responsive styling mapping out intuitive visual states.
- [docs/api.js](./docs/api.js) — Client engine interacting with remote infrastructure.
- [docs/api-design.md](./docs/api-design.md) — Production API specification and payload protocols.
- [docs/data-model.md](./docs/data-model.md) — Relational table designs and entity configurations.
- [docs/architecture.md](./docs/architecture.md) — System flow topography and scaling plans.

### 2. Functional API Implementation

- **Constant Resource Declaration:** Explicitly uses `const api_url = "https://jsonplaceholder.typicode.com/posts";`.
- **Asynchronous Processing:** Features a unified, reusable `makeRequest()` client that tracks responses and safely throws network execution exceptions.
- **CRUD Implementations:** Fully executes `GET` (fetch and load 10 notes), `POST` (create configuration nodes), and `DELETE` (purge data identifiers) actions.
- **Robust Framework Controls:** Wrapped entirely inside `try/catch/finally` blocks to elegantly catch edge-case connection drops on unstable backbones.

### 3. State Management & Validations

- **Explicit State Visibility:** Real-time user statuses track `loading`, `success`, `error`, and `empty` workflows dynamically.
- **Defensive UI Locking:** Interactive action buttons (`#load-btn`, `#submit-btn`) lock out automatically while requests are running to stop duplicate pipeline spam.
- **Input Validation Constraints:** Enforces title field requirements and caps maximum lengths cleanly at **100 characters** with descriptive validation banners.

---

## Setup & Execution Guide

Follow these steps to preview and test the software ecosystem:

1.  **Clone the Repository**

    ```bash
    git clone https://github.com
    cd quicknotes-system-design
    ```

2.  **Launch the Environment**
    Since the application relies on an explicit script file decoupling strategy (`defer`), simply open the main file directly in any modern browser:

    ```bash
    # On macOS
    open docs/index.html

    # On Linux / Windows
    code docs/index.html
    ```

3.  **Simulating Key Project Evaluation States**
    - **Loading State:** Click the **Fetch Tech Notes** button to see the connection status switch to yellow during the active promise pipeline.
    - **Empty State:** Clear out the pre-seeded notes on the dashboard using the _Futa_ button. The UI immediately updates its layout configuration to display the system empty state banner.
    - **Validation Check:** Attempt to save a note with an empty title or an overly long headline to trigger the defensive validation blocks.

---

## System Presentation Checklist (Day 8 Rubric)

- [x] Public GitHub Repository set to `public`.
- [x] Three verified document components situated entirely inside the `docs/` folder.
- [x] Async request wrapper explicitly configured with standard error tracking modules.
- [x] Script component utilizes the non-blocking execution model (`defer`).
