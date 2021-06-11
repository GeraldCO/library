    const myDisplay = document.getElementById('display');
    const newBook = document.getElementById('newBook');
    const title = document.querySelector('#booksTitle');
    const author = document.querySelector('#booksAuthor');
    const pages = document.querySelector('#booksPages');
    const isRead = document.querySelector('#isRead');
    var removeButtons = [];
    var readStatusButtons = [];
    

    let myLibrary = [];
    
    function Book( title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    function getBook(bookTitle) {
        for (let book of myLibrary) {
            if (book.title === bookTitle) {
            return book;
            }
        }
        return null;
    }

    let book1 = new Book('gerald', 'mi libro', 636, false);
    let book2 = new Book('fernando', 'ricardo', 88, true);
    let book3 = new Book('chacha', 'isabel', 2, true);
    let book4 = new Book('chacha', 'isabel', 2, true);
    let book5 = new Book('fernando', 'ricardo', 88, true);
    

    myLibrary.push(book1);
    myLibrary.push(book2);
    myLibrary.push(book3);
    myLibrary.push(book4);
    myLibrary.push(book5);

    function loadLibriray(){
        for (let item of myLibrary){
            createCard(item);
        }

        removeButtons = document.querySelectorAll('.btn-danger');
        removeButtons.forEach((button)=>{
            button.addEventListener('click', (e)=>{
                removeBook(e.target.parentNode.firstChild.innerHTML);
                console.log("si funciona ");
                updateGrid();
            });
            
        });

        readStatusButtons = document.querySelectorAll('.readStatus');
        readStatusButtons.forEach((button)=>{
            button.addEventListener('click', (e)=>{
                var currentBookTitle = e.target.parentNode.firstChild.innerHTML;
                var currentBook = getBook(currentBookTitle);
                currentBook.read = !currentBook.read;
                var index = myLibrary.indexOf(currentBook);
                myLibrary[index] = currentBookTitle;
                console.log(e.target.classList);
                if(e.target.innerHTML == 'Not read'){
                    e.target.innerHTML = 'Read';
                    e.target.classList = 'btn readStatus btn-primary';
                }else{
                    e.target.innerHTML = 'Not read';
                    e.target.classList = 'btn readStatus btn-warning';
                }

                //e.target.parent().children(':nth-child(3)').innerHTML = "gatos";
            });
        });
    }

    // alternative to DOMContentLoaded
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            // Initialize your application or run some code.
            loadLibriray();
        }
    }

    function updateGrid(){
        resetGrid();
        loadLibriray();
    }

    function resetGrid() {
        myDisplay.innerHTML = "";
      }
    
    

    function createCard(book){
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('col');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.innerHTML = book.title;
        
        let bookAuthor = document.createElement('h6');
        bookAuthor.className = 'card-subtitle mb-2 text-muted';
        bookAuthor.innerHTML = book.author;

        let bookPages = document.createElement('h6');
        bookPages.className = 'card-subtitle mb-2 text-muted';
        bookPages.innerHTML = book.pages;

        let bookReadOrNot = document.createElement('h6');
        bookReadOrNot.className = 'card-subtitle mb-2 text-muted';
        bookReadOrNot.innerHTML = book.read;

        let readStatus = document.createElement('button');

        if(book.read) {
            readStatus.innerHTML = 'Read';
            readStatus.classList = 'btn readStatus btn-primary';
        } else {
            readStatus.innerHTML = 'Not read';
            readStatus.classList = 'btn readStatus btn-warning';
        }
        
        

        let removeBtn = document.createElement('button');
        removeBtn.classList = 'btn btn-danger';
        removeBtn.innerHTML = 'remove';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(bookAuthor);
        cardBody.appendChild(bookPages);
        cardBody.appendChild(bookReadOrNot);
        cardBody.appendChild(readStatus);
        cardBody.appendChild(removeBtn);
        card.appendChild(cardBody);
        myDisplay.appendChild(card);
    }

    function getBookFromInput(){
        return new Book(title.value, author.value, pages.value, isRead.checked );
    }

    function removeBook(bookTitle){
        myLibrary = myLibrary.filter( (book) => book.title !== bookTitle);
    }


    //newBook.addEventListener('click', ()=>createCard(myBook));

    function addBookToLibrary(){
        const newBook = getBookFromInput();
        myLibrary.push(newBook);
        title.value= '';
        author.value = '';
        pages.value = '';
        isRead.checked = false;
        createCard(newBook);
    }

    const submitBtn = document.querySelector('#submitBtn');
    submitBtn.addEventListener('click', addBookToLibrary);

    Book.prototype.info = function(){
        return ( this.title+" by "+ this.author + ", " + this.pages + " pages, "+ this.read);
    }