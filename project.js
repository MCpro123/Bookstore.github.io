// Hardcoded admin credentials (for demo purposes)
const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };
  
  // Track if the user is logged in as admin
  let isAdmin = false;
  
  // Get references to the necessary elements
  const loginForm = document.getElementById('login-form');
  const adminPanel = document.getElementById('admin-panel');
  const loginError = document.getElementById('login-error');
  const booksContainer = document.getElementById('books-container');
  const uploadForm = document.getElementById('upload-form');
  
  // Sample book data
  let books = [
    { title: 'Book Title 1', price: '10.00', image: 'book1.jpg' },
    { title: 'Book Title 2', price: '12.00', image: 'book2.jpg' }
  ];
  
  // Function to display books in the gallery
  function displayBooks() {
    booksContainer.innerHTML = '';
    books.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>$${book.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      
      // Only show delete button if logged in as admin
      if (isAdmin) {
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-book');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteBook(index));
        bookDiv.appendChild(deleteButton);
      }
  
      booksContainer.appendChild(bookDiv);
    });
  }
  
  // Function to handle admin login
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username === adminCredentials.username && password === adminCredentials.password) {
      isAdmin = true;
      adminPanel.style.display = 'block';
      loginForm.style.display = 'none';
      displayBooks();
    } else {
      loginError.textContent = 'Invalid credentials. Please try again.';
    }
  });
  
  // Function to handle book upload
  uploadForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const bookTitle = document.getElementById('book-title').value;
    const bookPrice = document.getElementById('book-price').value;
    const bookImageInput = document.getElementById('book-image');
    const bookImage = URL.createObjectURL(bookImageInput.files[0]);
  
    books.push({ title: bookTitle, price: bookPrice, image: bookImage });
    displayBooks();
  });
  
  // Function to handle book deletion
  function deleteBook(index) {
    books.splice(index, 1);
    displayBooks();
  }
  
  // Initial display of books
  displayBooks();