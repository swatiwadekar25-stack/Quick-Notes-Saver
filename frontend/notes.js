const notesList = document.getElementById("notesList");
const API_URL = "https://quick-notes-saver-vi4b.onrender.com";

async function getNotes() {
    try {
        const response = await fetch(`${API_URL}/api/notes`);

        if (!response.ok) {
            throw new Error("Failed to get notes");
        }

        const result = await response.json();
        const notes = result.data;

        notesList.innerHTML = "";

        if (!notes || notes.length === 0) {
            notesList.innerHTML = "<p class='empty'>No notes found.</p>";
            return;
        }

        notes.forEach((note) => {
            const card = document.createElement("div");
            card.classList.add("note-card");

            card.innerHTML = `
                <div class="note-header">
                    <h2>${note.title}</h2>
                    <div class="card-actions">
                        <!-- Edit Icon Button -->
                        <button class="icon-btn icon-edit" onclick="editNote('${note._id}')" title="Edit Note">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                        </button>

                        <!-- Delete Icon Button -->
                        <button class="icon-btn icon-delete" onclick="deleteNote('${note._id}')" title="Delete Note">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <p class="content">
                    ${note.content}
                </p>

                <p class="date">
                    Created:
                    ${new Date(note.createdAt).toLocaleString()}
                </p>
            `;

            notesList.appendChild(card);
        });

    } catch (error) {
        console.log(error);
        notesList.innerHTML = "<p class='error'>Unable to load notes.</p>";
    }
}

async function deleteNote(id) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/notes/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert(data.message);
        getNotes();

    } catch (error) {
        console.log(error);
        alert("Error deleting note");
    }
}

function editNote(id) {
    console.log("Edit note ID:", id);
    localStorage.setItem("editNoteId", id);
    window.location.href = "index.html";
}

// Initial call to load notes
getNotes();