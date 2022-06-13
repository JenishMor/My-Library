console.log("This is My Library website");
showBook();

// Add a scrollbar
let table = document.getElementById('table');
table.style.overflow = 'auto';      
table.style.height = '220px';

function showBook() {
    let books = localStorage.getItem('books');

    if (books == null) {
        bookObj = [];
    }
    else {
        bookObj = JSON.parse(books);
    }

    let content = "";
    bookObj.forEach(function (element, index) {
        content += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button type="button" class="btn btn-secondary" id="${index}" onclick="deleteBook(this.id)">Delete</button></td>
                    </tr>`;

    });

    let tBody = document.getElementById('tableBody');
    if (bookObj.length != 0) {
        tBody.innerHTML = content;
    }
    else {
        console.log("Nothing to show");
        tBody.innerHTML = ` `;
    }
}

function deleteBook(index) {
    let books = localStorage.getItem('books');

    if (books == null) {
        bookObj = [];
    }
    else {
        bookObj = JSON.parse(books);
    }

    bookObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    showBook();
}

//Create a book constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Function to display value
function Display() {

}

Display.prototype.add = function (book) {
    let books = localStorage.getItem('books');

    if (books == null) {
        bookObj = [];
    }
    else {
        bookObj = JSON.parse(books);
    }

    bookObj.push(book);
    // console.log(book);
    localStorage.setItem('books', JSON.stringify(bookObj));

    showBook();
}

Display.prototype.reset = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

Display.prototype.validate = function (book) {
    if (book.name.length <= 2 || book.author.length <= 2) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (amsg, type, message) {
    let alert = document.getElementById('alertMsg');

    alert.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" id="alert" role="alert">
    <strong>${amsg}: </strong> ${message}
    </div>`;

    setTimeout(() => {
        alert.innerHTML = '';
    }, 4000);
}

// formSubmit();

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', formSubmit);

function formSubmit(e) {


    let name = document.getElementById('bookName').value;
    let author = document.getElementById('Author').value;
    // let type = document.getElementById('Type');
    let type;
    let biography = document.getElementById('Biography');
    let programming = document.getElementById('Programming');
    let cooking = document.getElementById('Cooking');

    // let books = document.getElementById();


    if (biography.checked) {
        type = biography.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    console.log('You have submitted form');

    let book = new Book(name, author, type);
    // console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);

        display.reset();
        display.show('Success', 'success', 'Your Book has been added successfully .');
        // console.log('Success');
    }
    else {
        display.show('Error', 'danger', 'Please Enter book name and author name.');
        // console.log('Invalid name or author');
    }
    e.preventDefault();
}