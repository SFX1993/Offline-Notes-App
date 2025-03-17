const noteInput = document.getElementById("note-input");
const saveBtn = document.getElementById("save-btn");
const noteList = document.getElementById("notes-list");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  noteList.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.textContent = note;
    noteList.appendChild(noteDiv);
  });
}
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
saveBtn.addEventListener("click", () => {
  const newNote = noteInput.value.trim();
  if (newNote === "") return;
  notes.push(newNote);
  saveNotes();
  renderNotes();
  noteInput.value = "";
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
renderNotes();
