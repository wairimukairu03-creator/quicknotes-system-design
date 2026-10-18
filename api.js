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
  
];


async function makeRequest(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Safaricom-backbone link dropped! Status code: ${response.status}`,
    );
  }
  return await response.json();
}


function setUiState(isLoading, statusMessage, statusType = "idle") {
  
  loadBtn.disabled = isLoading;
  submitBtn.disabled = isLoading;

  
  statusText.innerText = statusMessage;
  statusText.className = statusType;
}

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


function escapeHtml(text) {
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}


async function handleLoadNotes() {
  setUiState(
    true,
    "Connecting to cloud pipeline via Nairobi data center...",
    "loading",
  );

  try {
    const data = await makeRequest(`${api_url}?_limit=10`);


    
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


async function handleCreateNote(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  
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


    const newNote = {
      id: result.id + Math.floor(Math.random() * 1000), 
      title: title,
      body: body,
    };

    memoryNotes.unshift(newNote);
    renderNotes();
    noteForm.reset();
    setUiState(false, "Note secure! Document updated dynamically.", "success");
 
}



  if (!confirmDelete) return;

  setUiState(
    true,
    `Purging record identifier ref: [ID: ${noteId}]...`,
    "loading",
  );

  try {
    await makeRequest(`${api_url}/${noteId < 100 ? noteId : 1}`, {
      method: "DELETE",
    });

    
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


loadBtn.addEventListener("click", handleLoadNotes);
noteForm.addEventListener("submit", handleCreateNote);

renderNotes();
