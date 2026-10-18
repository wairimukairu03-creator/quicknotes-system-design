const api_url = "https://jsonplaceholder.typicode.com/posts";

const loadBtn = document.getElementById("load-btn");
const statusText = document.getElementById("status");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitBtn = document.getElementById("submit-btn");
const notesList = document.getElementById("notes-list");

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

async function makeRequest(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data = await response.json();
  return { data, status: response.status };
}

function setUiState(isLoading, statusMessage, statusType = "idle") {
  loadBtn.disabled = isLoading;
  submitBtn.disabled = isLoading;
  statusText.textContent = statusMessage;
  statusText.className = statusType;
}

function renderNotes() {
  notesList.innerHTML = "";

  if (memoryNotes.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.style.borderLeftColor = "#ffa000";
    emptyLi.textContent = "Hakuna notes zozote! Your list is currently empty.";
    notesList.appendChild(emptyLi);
    setUiState(
      false,
      "System State: Empty. No records found on dashboard.",
      "idle",
    );
    return;
  }

  memoryNotes.forEach((note) => {
    const li = document.createElement("li");

    const titleEl = document.createElement("strong");
    titleEl.textContent = note.title;

    const bodyEl = document.createElement("p");
    bodyEl.textContent = note.body || "No body content provided.";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Futa";
    deleteBtn.onclick = () => handleDelete(note.id);

    li.appendChild(titleEl);
    li.appendChild(bodyEl);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

async function handleLoadNotes() {
  setUiState(
    true,
    "Connecting to cloud pipeline via Nairobi data center...",
    "loading",
  );

  try {
    const { data: rawData, status } = await makeRequest(api_url);
    const limitedData = rawData.slice(0, 10);

    const mappedNotes = limitedData.map((item) => ({
      id: item.id,
      title: `System Node ${item.id}: ${item.title.substring(0, 20)}...`,
      body: `[Log Context: Konza Technopolis Branch] — ${item.body}`,
    }));

    memoryNotes = [...memoryNotes, ...mappedNotes];
    renderNotes();
    setUiState(
      false,
      `HTTP ${status}: Notes loaded successfully from remote node.`,
      "success",
    );
    return memoryNotes;
  } catch (error) {
    setUiState(
      false,
      `HTTP Error ${error.message}: Unable to fetch server logs.`,
      "error",
    );
    return null;
  }
}

async function handleCreateNote(e) {
  if (e) e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title) {
    setUiState(false, "Kosa! Note title cannot be blank.", "error");
    return null;
  }
  if (title.length > 100) {
    setUiState(
      false,
      `Kosa! Title is too long (${title.length}/100 chars).`,
      "error",
    );
    return null;
  }

  setUiState(
    true,
    "Uploading packet configurations to central terminal...",
    "loading",
  );

  try {
    const { data: result, status } = await makeRequest(api_url, {
      method: "POST",
      body: JSON.stringify({ title, body, userId: 254 }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    const generatedId = result.id + Math.floor(Math.random() * 1000);
    const newNote = { id: generatedId, title, body };

    memoryNotes.unshift(newNote);
    renderNotes();
    if (noteForm) noteForm.reset();

    setUiState(
      false,
      `HTTP ${status} Created! Node Identifier allocated: [Resource ID: ${generatedId}].`,
      "success",
    );
    return newNote;
  } catch (error) {
    setUiState(
      false,
      `HTTP Error ${error.message}: Failed to submit data block.`,
      "error",
    );
    return null;
  }
}

async function handleDelete(noteId) {
  const confirmDelete = confirm(
    "Je, uko na uhakika unataka kufuta hii record?",
  );
  if (!confirmDelete) return false;

  setUiState(
    true,
    `Purging record identifier ref: [ID: ${noteId}]...`,
    "loading",
  );

  try {
    const { status } = await makeRequest(
      `${api_url}/${noteId < 100 ? noteId : 1}`,
      {
        method: "DELETE",
      },
    );

    memoryNotes = memoryNotes.filter((note) => note.id !== noteId);
    renderNotes();
    setUiState(
      false,
      `HTTP ${status}: Record deleted cleanly from index parameters.`,
      "success",
    );
    return true;
  } catch (error) {
    setUiState(
      false,
      `HTTP Error ${error.message}: Error dropping data node.`,
      "error",
    );
    return false;
  }
}

if (loadBtn) loadBtn.addEventListener("click", handleLoadNotes);
if (noteForm) noteForm.addEventListener("submit", handleCreateNote);

renderNotes();
