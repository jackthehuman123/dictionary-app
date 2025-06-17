const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const word = document.getElementById("word").value.trim().toLowerCase();

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    let foundDefinition = null;
    let foundExample = null;

    // Using some loop to find the first defs and exs
    // Look for the first definition with an example
    for (const meaning of data[0].meanings) {
      for (const def of meaning.definitions) {
        if (def.example) {
          foundDefinition = def.definition;
          foundExample = def.example;
          break;
        }
      }
      if (foundExample) break;
    }

    // Fallback if no example is found
    if (!foundDefinition) {
      foundDefinition = data[0].meanings[0].definitions[0].definition;
      foundExample = "No example available.";
    }

    document.getElementById(
      "definition"
    ).innerHTML = `<strong>Definition:</strong> ${foundDefinition}`;
    document.getElementById(
      "example"
    ).innerHTML = `<strong>Example:</strong> ${foundExample}`;

    // For CSS transition
    document.body.classList.add("moved-up");
  } catch (err) {
    alert("Invalid word");
  }
});
