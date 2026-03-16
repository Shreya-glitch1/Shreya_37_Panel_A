const display = document.getElementById("display");
const buttons = document.querySelectorAll(".key");
const toggle = document.getElementById("themeToggle");

let expression = "";

// Calculator logic
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) {
      expression += value;
      updateDisplay(expression);
    }

    if (action === "clear") {
      expression = "";
      updateDisplay("0");
    }

    if (action === "delete") {
      expression = expression.slice(0, -1);
      updateDisplay(expression || "0");
    }

    if (action === "equals") {
      try {
        expression = eval(expression).toString();
        updateDisplay(expression);
      } catch {
        updateDisplay("Error");
        expression = "";
      }
    }
  });
});

// Theme toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

function updateDisplay(value) {
  display.innerText = value;
}
