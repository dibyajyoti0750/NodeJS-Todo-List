document.addEventListener("DOMContentLoaded", () => {
  const taskText = document.querySelector(".task-text");
  const saveChanges = document.querySelector(".saveChanges");

  // Store initial value
  let oldTask = taskText.value;

  // Update initial value on focus
  taskText.addEventListener("focus", () => {
    oldTask = taskText.value;
  });

  taskText.addEventListener("blur", () => {
    if (taskText.value.trim() !== oldTask.trim()) {
      saveChanges.style.display = "block"; // Show button only if value changed
    }
  });

  taskText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line
      taskText.blur(); // Lose textarea focus
      if (taskText.value.trim() !== oldTask.trim()) {
        saveChanges.style.display = "block";
      }
    }
  });
});
