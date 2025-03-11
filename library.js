export const library = [];

export function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Must use the new keyword");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    let read = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
  };
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

export function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
}

export function removeBookFromLibrary(book) {
  const index = library.findIndex((b) => b.id == book.id);
  if (index != -1) {
    library.splice(index, 1);
  }
}
