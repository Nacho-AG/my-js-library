const COLORS = ["rgb(204, 47, 35)", "rgb(28, 95, 28)", "rgb(76, 74, 202)"]

const form = document.querySelector("#book-form");
const addBookButton = document.querySelector("#add-book-button");
const submitFormButton = document.querySelector("#submit-form-button");

const titleInput = form.querySelector("#title");
const authorInput = form.querySelector("#author");
const pagesInput = form.querySelector("#pages");

const books = document.querySelectorAll(".book");

const library = [];
let currentBook;

function displayForm() {
    form.style.display = "block";
    addBookButton.style.display = "none";
    submitFormButton.style.display = "block";
}

function submitForm() {
    if (titleInput.value != "" ||
        authorInput.value != "" ||
        pagesInput.value != "") {

            // Save the info and create the new book
            library.push(new Book(
                titleInput.value || "Title example", 
                authorInput.value || "Author example", 
                pagesInput.value || 200));

            showBooks();

            // Clear the form
            titleInput.value = "";
            authorInput.value = "";
            pagesInput.value = "";

            // Close the form
            form.style.display = "none";
            addBookButton.style.display = "block";
            submitFormButton.style.display = "none";
    }
}

function showBooks() {

    // Get the container in the html (library itself)
    const bookContainer = document.querySelector("#book-container");
    bookContainer.innerHTML = "";
    library.forEach(book => {
        bookContainer.insertAdjacentHTML("beforeend", 
    `   <div class="book" style="background-color: ${book.color}; width: ${book.width}px" data-info="${book.title}-${book.author}-${book.pages}"></div>\n`);
    });
    // Set the listeners again
    const books = document.querySelectorAll(".book");
    books.forEach(book => book.addEventListener("click", showInfo));
}

function showInfo() {
    // Save the current book
    currentBook = this;
    // Get the info div
    const expositor = document.querySelector("#book-info");
    expositor.style.display = "flex";
    expositor.addEventListener("click", () => expositor.style.display = "none");

    const bookPage = expositor.querySelector("#book-page")
    const bookPage2 = expositor.querySelector("#book-page2");
    bookPage.style.backgroundColor = getComputedStyle(this)["backgroundColor"];

    const info = this.dataset.info.split("-");
    bookPage.querySelector("h2").textContent = info[0];
    bookPage.querySelector("p").textContent = info[1];
    bookPage2.querySelector("h4").textContent = `${info[2]} pages`;

}

function removeBook() {
    const currentBookInfo = currentBook.dataset.info.split("-");
    console.log(currentBookInfo);
    library.map((book) => {
        if (book.title === currentBookInfo[0] &&
            book.author === currentBookInfo[1]) {
                library.splice(library.indexOf[book], 1);
            }
    });
    console.log(library);
    showBooks();
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.width = Math.floor(pages / 400 * 35);
}   

addBookButton.addEventListener("click", displayForm);
submitFormButton.addEventListener("click", submitForm);
books.forEach(book => book.addEventListener("click", showInfo));
document.querySelector("#remove-book-button").addEventListener("click", removeBook);
