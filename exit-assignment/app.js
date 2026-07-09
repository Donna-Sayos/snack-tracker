document.addEventListener("DOMContentLoaded", function () {
  const snackList = document.getElementById("list");
  const form = document.getElementById("form");
  const searchBar = document.getElementById("search");

  // snack list renderer
  const renderList = (snacksArr) => {
    snackList.innerHTML = "";
    snacksArr.forEach((snack) => {
      const li = document.createElement("li");
      li.textContent = `${snack.name} --- ${snack.category} --- ${snack.calories} cal`;

      li.addEventListener("click", () => {
        li.classList.toggle("eaten");
      });
      snackList.appendChild(li);
    });
  };

  // snack loader
  const loadSnacks = async () => {
    try {
      const res = await fetch("./data.json");

      if (!res.ok) {
        throw new Error("Failed to load snacks.");
        document.getElementById("error").textContent =
          "Failed to load snack list";
      }

      const data = await res.json();
      renderList(data.snacks);
    } catch (err) {
      console.error(`Failed to load snacks: ${err}`);
      document.getElementById("error").textContent = "Error: " + err.message;
    }
  };
  loadSnacks();

  // snack form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const calVal = document.getElementById("snackCalories").value;
    const cals = parseFloat(calVal);

    if (isNaN(cals) || cals < 0) return;

    const newSnack = {
      id: new Date(),
      name: document.getElementById("snackName").value,
      category: document.getElementById("snackCategory").value,
      calories: cals,
    };

    const li = document.createElement("li");
    li.textContent = `${newSnack.name} --- ${newSnack.category} --- ${newSnack.calories} cal`;
    li.addEventListener("click", () => {
      li.classList.toggle("eaten");
    });
    snackList.appendChild(li);

    form.reset();
  });

  // search
  searchBar.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll("#list li").forEach((li) => {
      if (li.textContent.toLowerCase().includes(searchText)) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    });
  });
});
