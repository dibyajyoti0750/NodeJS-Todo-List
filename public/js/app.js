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
