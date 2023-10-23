const words = [
  "programming",
  "developer",
  "javascript",
  "computer",
  "application",
  "algorithm",
  "interface",
  "database",
  "software",
  "function",
  "variable",
  "repository",
  "framework",
  "keyboard",
  "internet",
  "template",
  "frontend",
  "backend",
  "repository",
  "authentication",
];

export function chooseRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}