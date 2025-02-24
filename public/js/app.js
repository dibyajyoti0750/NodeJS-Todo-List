document.addEventListener("DOMContentLoaded", () => {
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    task.addEventListener("click", () => {
      window.location.href = `/home/task/${task.id}`;
    });

    let checkbox = task.children[0].children[0];
    checkbox.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    let label = task.children[0].children[1];
    label.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
});

const checkboxes = document.querySelectorAll(".checkbox");
const checkSound = new Audio("/sounds/ding-126626.mp3"); // Load the sound

for (let checkbox of checkboxes) {
  checkbox.addEventListener("change", async () => {
    if (checkbox.checked) {
      checkSound.currentTime = 0; // Reset sound to start (prevents delay)
      checkSound.play(); // Play the sound
    }

    const taskDiv = checkbox.closest(".task");
    const taskId = taskDiv.id;

    try {
      let res = await axios.delete(`/home/${taskId}`);
      if (res.status === 200) {
        let taskLabel = taskDiv.children[0].children[1];
        taskLabel.style.textDecoration = "line-through";
        taskDiv.style.transition = "opacity 0.9s ease-out"; // Smooth fade-out
        taskDiv.style.opacity = "0"; // Start fading out

        setTimeout(() => {
          taskDiv.remove();
        }, 1000);
      } else {
        console.log("Failed to delete task");
      }
    } catch (error) {
      console.log("Error", error);
    }
  });
}

const stars = document.querySelectorAll(".fa-star");

for (let star of stars) {
  star.addEventListener("click", (e) => {
    star.classList.toggle("far");
    star.classList.toggle("fas");
    e.stopPropagation();
  });
}
