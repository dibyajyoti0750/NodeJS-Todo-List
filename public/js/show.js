let taskText = document.querySelector(".task-text");
const saveChanges = document.querySelector(".saveChanges");

taskText.addEventListener("blur", () => {
  saveChanges.style.display = "block";
});

taskText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevents new line
    saveChanges.style.display = "block";
  }
});
