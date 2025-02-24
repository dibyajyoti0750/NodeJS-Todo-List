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

const checkbox = document.querySelector(".checkbox");
const checkSound = new Audio("/sounds/ding-126626.mp3");

checkbox.addEventListener("change", async () => {
  if (checkbox.checked) {
    checkSound.currentTime = 0;
    checkSound.play();
  }

  const taskDiv = checkbox.closest(".task");
  const taskId = taskDiv.id;
  console.log(taskDiv);

  try {
    let res = await axios.delete(`/home/${taskId}`);
    if (res.status === 200) {
      let taskLabel = taskDiv.children[0].children[1];
      taskLabel.style.textDecoration = "line-through";
      taskDiv.style.transition = "opacity 0.9s ease-out";
      taskDiv.style.opacity = "0";

      setTimeout(() => {
        taskDiv.remove();
        window.location.href = "/home";
      }, 1200);
    } else {
      console.log("Failed to delete task");
    }
  } catch (error) {
    console.log("Error", error);
  }
});
