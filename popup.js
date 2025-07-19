document
  .getElementById("upperCaseTab")
  .addEventListener("click", () => setActiveTab("upper"));
document
  .getElementById("lowerCaseTab")
  .addEventListener("click", () => setActiveTab("lower"));
document
  .getElementById("sentenceCaseTab")
  .addEventListener("click", () => setActiveTab("sentence"));
document
  .getElementById("titleCaseTab")
  .addEventListener("click", () => setActiveTab("title"));
document
  .getElementById("camelCaseTab")
  .addEventListener("click", () => setActiveTab("camel"));
document
  .getElementById("snakeCaseTab")
  .addEventListener("click", () => setActiveTab("snake"));
document
  .getElementById("kebabCaseTab")
  .addEventListener("click", () => setActiveTab("kebab"));
document
  .getElementById("pascalCaseTab")
  .addEventListener("click", () => setActiveTab("pascal"));
document.getElementById("copy").addEventListener("click", copy);

const textInput = document.getElementById("text");
textInput.addEventListener("input", convertText);
textInput.focus(); // Auto-focus the input field when popup opens

let activeTab = "upper";

function setActiveTab(tab) {
  activeTab = tab;
  document
    .querySelectorAll(".tab")
    .forEach((tabElement) => tabElement.classList.remove("active"));
  document.getElementById(tab + "CaseTab").classList.add("active");
  convertText();
}

function convertText() {
  changeCopyButtonText();
  const input = document.getElementById("text");
  const text = input.value;
  let convertedText = "";

  if (text) {
    switch (activeTab) {
      case "upper":
        convertedText = text.toUpperCase();
        break;
      case "lower":
        convertedText = text.toLowerCase();
        break;
      case "sentence":
        convertedText = toSentenceCase(text);
        break;
      case "camel":
        convertedText = toCamelCase(text);
        break;
      case "snake":
        convertedText = toSnakeCase(text);
        break;
      case "kebab":
        convertedText = toKebabCase(text);
        break;
      case "pascal":
        convertedText = toPascalCase(text);
        break;
      case "title":
        convertedText = toTitleCase(text);
        break;
    }
  }

  document.getElementById("convertedText").innerText = convertedText;
}

function toSentenceCase(text) {
  // Split by sentence terminators (., !, ?)
  return text
    .toLowerCase()
    .replace(/(^\s*|\.\s+|\!\s+|\?\s+)([a-z])/g, function (match, p1, p2) {
      return p1 + p2.toUpperCase();
    });
}

function toCamelCase(text) {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/\s+|_+|-+/)
    .filter((word) => word.length > 0)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
}

function toSnakeCase(text) {
  return text
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .split(/\s+|_+|-+/)
    .filter((word) => word.length > 0)
    .join("_");
}

function toKebabCase(text) {
  return text
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .split(/\s+|_+|-+/)
    .filter((word) => word.length > 0)
    .join("-");
}

function toPascalCase(text) {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/\s+|_+|-+/)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function toTitleCase(text) {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/\s+|_+|-+/)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function copy() {
  const copyText = document.getElementById("convertedText").innerText;

  if (copyText.trim() === "") {
    return; // Don't copy if there's nothing to copy
  }

  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      const button = document.getElementById("copy");
      button.innerText = "Copied!";
      setTimeout(() => {
        button.innerText = "Copy";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text. Please try again.");
    });
}

function changeCopyButtonText() {
  const button = document.getElementById("copy");
  button.innerText = "Copy";
}

// Initialize the first tab as active
document.getElementById("upperCaseTab").classList.add("active");
// Initial conversion in case there's default text
convertText();
