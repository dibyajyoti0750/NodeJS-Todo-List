const form = document.querySelector("form");
const inp = document.querySelector("input");
const errorMsg = document.querySelector(".errorMsg");

// Remove error message as soon as user starts typing
inp.addEventListener("input", () => {
  errorMsg.style.display = "none";
});

form.addEventListener("submit", (e) => {
  let trimmedValue = inp.value.trim();

  if (!trimmedValue) {
    e.preventDefault();
    errorMsg.style.display = "block";
    inp.value = "";
    inp.focus();
  } else {
    errorMsg.style.display = "none";
    inp.value = trimmedValue;
  }
});
