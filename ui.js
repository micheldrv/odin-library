import { library, removeBookFromLibrary, addBookToLibrary } from "./library.js";

export function renderLibrary() {
  const main = document.querySelector("main");
  const template = document.querySelector("#book-template");

  main.innerHTML = "";
  for (const book of library) {
    const bookElement = template.content.cloneNode(true);

    const title = bookElement.querySelector(".title");
    title.textContent = book.title;

    const author = bookElement.querySelector(".author");
    author.textContent = book.author;

    const pages = bookElement.querySelector(".pages");
    pages.textContent = book.pages;

    const read = bookElement.querySelector(".read");
    read.checked = book.read;
    read.addEventListener("click", (event) => {
      event.preventDefault();
      onToggleReadStatus(book);
    });

    const removeButton = bookElement.querySelector(".remove-btn");
    removeButton.addEventListener("click", (event) => {
      event.preventDefault();
      onRemoveBook(book);
    });

    main.appendChild(bookElement);
  }
}

function onRemoveBook(book) {
  removeBookFromLibrary(book);
  renderLibrary();
}

function onToggleReadStatus(book) {
  book.toggleReadStatus();
  renderLibrary();
}

function onAddBook() {
  clearAddBookDialog();
  openAddBookDialog();
}

function onAddBookConfirm() {
  const form = document.querySelector("#add-book-form");
  if (form.checkValidity()) {
    const data = getAddBookDialogData();
    addBookToLibrary(data.title, data.author, data.pages, data.read);
    renderLibrary();
    closeAddBookDialog();
  }
}

function onAddBookCancel() {
  closeAddBookDialog();
}

function openAddBookDialog() {
  const dialog = document.querySelector("#add-book-dialog");
  dialog.setAttribute("open", "");
}

function closeAddBookDialog() {
  const dialog = document.querySelector("#add-book-dialog");
  dialog.removeAttribute("open");
}

function getAddBookDialogData() {
  return {
    title: document.querySelector("#add-book-title").value,
    author: document.querySelector("#add-book-author").value,
    pages: document.querySelector("#add-book-pages").value,
    read: document.querySelector("#add-book-read").checked,
  };
}

function clearAddBookDialog() {
  document.querySelector("#add-book-title").value = "";
  document.querySelector("#add-book-author").value = "";
  document.querySelector("#add-book-pages").value = "";
  document.querySelector("#add-book-read").checked = false;
}

export function bindButtons() {
  function addEvent(event, query, func, preventDefault = true) {
    document.querySelector(query).addEventListener(event, (ev) => {
      if (preventDefault) {
        ev.preventDefault();
      }
      func();
    });
  }

  addEvent("click", "#add-book-btn", onAddBook);
  addEvent("click", "#cancel-btn", onAddBookCancel);
  addEvent("click", "#dialog-background", onAddBookCancel);

  addEvent("submit", "#add-book-form", onAddBookConfirm, false);
}
