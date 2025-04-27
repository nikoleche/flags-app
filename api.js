const visitedContent = document.getElementById("visited-content");
const initialMsg = document.createElement("p");

initialMsg.textContent =
  "You haven't added any countries yet. Start adding them using the search bar.";
visitedContent.appendChild(initialMsg);

const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("search-input");

const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");

const resetBtn = document.getElementById("resetBtn");

let totalFlags = 0;

// API REQUESTS

async function addFlag() {
  const countryName = searchInput.value.trim().toLowerCase();

  if (!countryName) {
    alert("Insert country before pressing the add button");
    throw new Error("Empty input");
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    if (response.status === 404) {
      alert("Please insert a valid country");
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch. Status: ${response.status}`);
    }

    let data = await response.json();
    const countryFlag = data[0].flags.png;

    // CHECK IF THE FLAG ALREADY EXISTS
    const addedFlags = [...visitedContent.querySelectorAll("img")].some(
      (img) => img.alt === countryName
    );

    if (!addedFlags) {
      initialMsg.textContent = "";
      const flagImg = document.createElement("img");
      flagImg.classList.add("flag");
      flagImg.src = countryFlag;
      flagImg.alt = countryName;
      visitedContent.appendChild(flagImg);
      totalFlags += 1;
    } else {
      alert(
        `${
          countryName.charAt(0).toUpperCase() + countryName.slice(1)
        } is already added`
      );
    }

    // CLEAR INPUT
    searchInput.value = "";
  } catch (error) {
    console.error("API Error", error);
  }
}

addBtn.addEventListener("click", addFlag);

// ENTER KEY

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addFlag();
  }
});

// RESULT

submitBtn.addEventListener("click", () => {
  //  CLEAR INPUT
  output.innerHTML = "";

  const outputFlags = document.createElement("h2");
  const outputTotal = document.createElement("h2");
  const worldTotal = ((totalFlags / 195) * 100).toFixed(1);

  if (totalFlags === 1) {
    outputFlags.textContent = `You have visited 1 country.`;
  } else if (totalFlags > 1) {
    outputFlags.textContent = `You have visited ${totalFlags} countries.`;
  }

  outputTotal.textContent = `So far, you have seen ${worldTotal}% of the world.`;

  output.appendChild(outputFlags);
  output.appendChild(outputTotal);
});

// RESET FORM

resetBtn.addEventListener("click", () => {
  visitedContent.innerHTML = "";
  output.innerHTML = "";
  totalFlags = 0;

  initialMsg.textContent =
    "You haven't added any countries yet. Start adding them using the search bar.";
  visitedContent.appendChild(initialMsg);
});
