'use strict';

// $(document).ready(function(){
//   $('.filter-item button').click(function(){
//     $('.project-item').removeClass('active');
//   });
// });

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const aosElements = document.querySelectorAll("article [data-aos]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    aosElements.forEach(function(element) {
      // Remove 'aos-animate' class from each element
      element.classList.remove('aos-animate');
      element.classList.remove('aos-init');
  });
    setTimeout(function() {
      aosElements.forEach(function(element) {
        // Remove 'aos-animate' class from each element
        element.classList.add('aos-animate');
        element.classList.add('aos-init');
    });
    }, 400);
    
    // AOS.init();
    // console.log(AOS.refresh());
    for (let i = 0; i < pages.length; i++) { // changed variable name to avoid confusion
      // console.log(navigationLinks[i].dataset.navLink); // corrected case for navLink
      if (this.dataset.navLink.toLowerCase() === pages[i].dataset.page) { // corrected case for page
        
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
$(document).ready(function(){
  $('.blogListing').click(function(){
    $('[data-nav-link]').each(function() {
      if ($(this).data('nav-link').toLowerCase() === 'blog') {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });
});

AOS.init({
  once: true,
  easing: 'ease-in-out'
});



// lightGallery(document.querySelector(''), {
//   // plugins: [lgFullscreen, lgThumbnail, lgAutoplay, lgComment, lgHash, lgPager, lgRotate, lgShare, lgVideo],
//   plugins: [lgFullscreen, lgThumbnail, lgAutoplay, lgComment, lgHash, lgRotate, lgShare, lgVideo],
//   speed: 500,
//   zoomFromOrigin: false,
//   // mode: 'lg-fade',
// });



// Selecting all elements with class "word"
var words = document.querySelectorAll(".word");

// Iterating over each word
words.forEach(function(word) {
  // Splitting each word into letters
  var letters = word.textContent.split("");
  // Emptying the word
  word.textContent = "";
  // Iterating over each letter
  letters.forEach(function(letter) {
    // Creating a span element for each letter
    var span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    // Appending the span to the word
    word.appendChild(span);
  });
});

// Initializing variables for word rotation
var currentWordIndex = 0;
var maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

// Function to rotate the words
function rotateText() {
  var currentWord = words[currentWordIndex];
  var nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  // Rotate out letters of current word
  Array.from(currentWord.children).forEach(function(letter, i) {
    setTimeout(function() {
      letter.className = "letter out";
    }, i * 80);
  });

  // Reveal and rotate in letters of next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach(function(letter, i) {
    letter.className = "letter behind";
    setTimeout(function() {
      letter.className = "letter in";
    }, 340 + i * 80);
  });

  // Updating current word index
  currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
}

// Initial rotation
rotateText();
// Rotating words at intervals
setInterval(rotateText, 4000);


// $('.service-item').hover(function () {
//    $(this).find('.service-item-text').slideToggle();
//   }
// );