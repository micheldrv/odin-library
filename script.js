import { addBookToLibrary } from "./library.js";
import { bindButtons, renderLibrary } from "./ui.js";

window.addEventListener("DOMContentLoaded", () => {
  bindButtons();
  addBookToLibrary("A", "a", 1, false);
  addBookToLibrary("B", "b", 2, true);
  addBookToLibrary("C", "c", 3, false);
  renderLibrary();
});
