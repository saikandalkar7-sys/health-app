const form = document.getElementById("checkerForm");
const input = document.getElementById("textInput");
const normalizeOption = document.getElementById("normalizeOption");
const result = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");

function normalizeText(value, ignoreFormatting) {
  if (!ignoreFormatting) return value;
  // Keep Unicode letters and numbers; remove whitespace and punctuation.
  return value.toLocaleLowerCase().replace(/[\s\p{P}\p{S}]/gu, "");
}

function isPalindrome(value) {
  const reversed = Array.from(value).reverse().join("");
  return { match: value === reversed, reversed };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const original = input.value.trim();

  if (!original) {
    errorMessage.hidden = false;
    result.hidden = true;
    input.focus();
    return;
  }

  errorMessage.hidden = true;
  const normalized = normalizeText(original, normalizeOption.checked);
  const comparison = isPalindrome(normalized);

  result.hidden = false;
  result.className = `result ${comparison.match ? "success" : "failure"}`;
  document.getElementById("resultTitle").textContent =
    comparison.match ? "✓ It is a palindrome!" : "✕ It is not a palindrome.";
  document.getElementById("resultDescription").textContent =
    comparison.match
      ? "The processed text reads the same forward and backward."
      : "The processed text differs when reversed.";
  document.getElementById("originalValue").textContent = original;
  document.getElementById("reverseValue").textContent = comparison.reversed;
  document.getElementById("normalizedValue").textContent = normalized || "(empty after processing)";
});

document.getElementById("clearBtn").addEventListener("click", () => {
  input.value = "";
  result.hidden = true;
  errorMessage.hidden = true;
  input.focus();
});
