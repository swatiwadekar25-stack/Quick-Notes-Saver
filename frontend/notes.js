const notesList = document.getElementById("notesList");


async function getNotes() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/notes"
        );

        if (!response.ok) {
            throw new Error("Failed to get notes");
        }

        const result = await response.json();

        const notes = result.data;

        notesList.innerHTML = "";

        if (notes.length === 0) {

            notesList.innerHTML =
                "<p class='empty'>No notes found.</p>";

            return;
        }

        notes.forEach((note) => {

            const card = document.createElement("div");

            card.classList.add("note-card");

            card.innerHTML = `
                <h2>${note.title}</h2>

                <p class="content">
                    ${note.content}
                </p>

                <p class="date">
                    Created:
                    ${new Date(note.createdAt).toLocaleString()}
                </p>

                <button
                    class="edit-btn"
                    onclick="editNote('${note._id}')">
                    ✏️ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteNote('${note._id}')">
                    ❌ Delete
                </button>
            `;

            notesList.appendChild(card);
        });

    } catch (error) {

        console.log(error);

        notesList.innerHTML =
            "<p class='error'>Unable to load notes.</p>";
    }
}


async function deleteNote(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/notes/${id}`,
            {
                method: "DELETE"
            }
        );

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


getNotes();