document.addEventListener("DOMContentLoaded", () => {
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    task.addEventListener("click", () => {
      window.location.href = `/home/task/${task.id}`;
    });
  });
});
