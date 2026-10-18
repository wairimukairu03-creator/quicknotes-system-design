// Constants required by assignment parameters
const api_url = "https://jsonplaceholder.typicode.com/posts";

// DOM Elements
const loadBtn = document.getElementById("load-btn");
const statusText = document.getElementById("status");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitBtn = document.getElementById("submit-btn");
const notesList = document.getElementById("notes-list");

// Local UI array to manage states dynamically
let memoryNotes = [
  {
    id: 2541,
    title: "M-Pesa API integration",
    body: "Check connection timeouts for the Safaricom sandbox environment.",
  },
  {
    id: 2542,
    title: "Mombasa Cold Storage Layout",
    body: "Architecture plans for the new IoT sensors near the port docks.",
  },
];

// Reusable Async Request Wrapper with strict validation and error throws
async function makeRequest(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Safaricom-backbone link dropped! Status code: ${response.status}`,
    );
  }
  return await response.json();
}

// Global UI State Manager for Loading/Interactive Locks
function setUiState(isLoading, statusMessage, statusType = "idle") {
  // Buttons disabled while requests are running
  loadBtn.disabled = isLoading;
  submitBtn.disabled = isLoading;

  // Manage Loading, Success, Error states
  statusText.innerText = statusMessage;
  statusText.className = statusType;
}

// Render Engine for UI
function renderNotes() {
  notesList.innerHTML = "";

  if (memoryNotes.length === 0) {
    notesList.innerHTML = `<li style="border-left-color: #ffa000;">Hakuna notes zozote! Your list is currently empty.</li>`;

    setUiState(
      false,
      "System State: Empty. No records found on dashboard.",
      "idle",
    );

    return;
  }

  memoryNotes.forEach((note) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <strong>${escapeHtml(note.title)}</strong>
            <p>${escapeHtml(note.body)}</p>
            <button class="delete-btn" onclick="handleDelete(${note.id})">Futa</button>
        `;
    notesList.appendChild(li);
  });
}

// Prevent Cross-site Scripting via text inputs
function escapeHtml(text) {
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ==========================================================================
   TASK OPERATIONS (GET, POST, DELETE)
   ========================================================================== */

// Task 1: API Client - Load Notes (GET)
async function handleLoadNotes() {
  setUiState(
    true,
    "Connecting to cloud pipeline via Nairobi data center...",
    "loading",
  );

  try {
    const data = await makeRequest(`${api_url}?_limit=10`);

    // Transform placeholder API into relevant Kenyan business test scenarios
    const mappedNotes = data.map((item, index) => ({
      id: item.id,
      title: `System Node ${item.id}: ${item.title.substring(0, 20)}...`,
      body: `[Log Context: Konza Technopolis Branch] — ${item.body}`,
    }));

    // Merge incoming assets with existing configurations
    memoryNotes = [...memoryNotes, ...mappedNotes];
    renderNotes();
    setUiState(
      false,
      "Safi! Notes loaded successfully from remote node.",
      "success",
    );
  } catch (error) {
    setUiState(
      false,
      `Shida imepatikana: Unable to fetch logs. (${error.message})`,
      "error",
    );
  }
}

// Task 2: API Client - Save Note (POST)
async function handleCreateNote(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  // STRICT VALIDATION: (A title is required, with a maximum of 100 characters)
  if (!title) {
    setUiState(false, "Kosa! Note title cannot be blank.", "error");
    return;
  }
  if (title.length > 100) {
    setUiState(
      false,
      `Kosa! Title is too long (${title.length}/100 chars). Reduce text size.`,
      "error",
    );
    return;
  }

  setUiState(
    true,
    "Uploading packet configurations to central terminal...",
    "loading",
  );

  try {
    const result = await makeRequest(api_url, {
      method: "POST",
      body: JSON.stringify({ title, body, userId: 254 }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    // Add server response locally to list view
    const newNote = {
      id: result.id + Math.floor(Math.random() * 1000), // Ensure local unique variant ID keys
      title: title,
      body: body,
    };

    memoryNotes.unshift(newNote);
    renderNotes();
    noteForm.reset();
    setUiState(false, "Note secure! Document updated dynamically.", "success");
  } catch (error) {
    setUiState(false, `Failed to submit data block: ${error.message}`, "error");
  }
}

// Task 3: Client Component - Remove Item (DELETE)
async function handleDelete(noteId) {
  const confirmDelete = confirm(
    "Je, uko na uhakika unataka kufuta hii record?",
  );
  if (!confirmDelete) return;

  setUiState(
    true,
    `Purging record identifier ref: [ID: ${noteId}]...`,
    "loading",
  );

  try {
    // Issue system delete call tracking mock location endpoints
    await makeRequest(`${api_url}/${noteId < 100 ? noteId : 1}`, {
      method: "DELETE",
    });

    // Filter instance out of structural memory arrays
    memoryNotes = memoryNotes.filter((note) => note.id !== noteId);
    renderNotes();
    setUiState(
      false,
      "Record deleted clean from localized index parameters.",
      "success",
    );
  } catch (error) {
    setUiState(false, `Error dropping data node: ${error.message}`, "error");
  }
}

// Event Triggers and Initial Boot Execution Setup
loadBtn.addEventListener("click", handleLoadNotes);
noteForm.addEventListener("submit", handleCreateNote);

// Seed mock dashboard instances automatically on application start
renderNotes();
