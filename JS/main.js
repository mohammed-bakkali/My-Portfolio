// Check if Theres Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spain For Rotation On Self
  // this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settinf Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Test
    console.log(e.target.dataset.color);

    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);

    //Remove Active Class From All Childrens
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    // Add Ative Class On self
    e.target.classList.add("active");
  });
});

// Start top Scroll
let span = document.querySelector(".up");
let header = document.querySelector(".header");

window.onscroll = function () {
  if (window.scrollY >= 600) {
    span.style.display = "block";
  } else {
    span.style.display = "none";
  }

  if (window.scrollY >= 1) {
    header.style.background = "#161718";
  } else {
    // Reset the style if needed when scrolling back up
    header.style.background = ""; // Resetting the background to its default state
  }
};
/*~~~~~~~~~~~~~~~ SHOW SCROLL UP ~~~~~~~~~~~~~~~*/
span.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

// Select all filter buttons and filterable cards
const filterButtons = document.querySelectorAll(".filter_buttons button");
const filterableCards = document.querySelectorAll(".filterable_cards .card");

console.log(filterButtons, filterableCards);

// Define the filterCards function
const filterCards = (e) => {
  // Remove the 'active' class from the previously active element if exists
  const activeButton = document.querySelector(".filter_buttons .active");
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  // Add the 'active' class to the clicked element
  e.target.classList.toggle("active");
  console.log(e.target);

  // Iterate over each filterable card
  filterableCards.forEach((card) => {
    // Add 'hide' class to hide rhe card initially
    card.classList.add("hide");
    //  Check if the card matches the selected filter or "all" is selected
    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      // Removes the "Hide" card view category
      card.classList.remove("hide");
    }
  });
};

// Add click event listener to each filter
filterButtons.forEach((button) =>
  button.addEventListener("click", filterCards)
);

// End  top Scroll

/*~~~~~~~~~~~~~~~ MENU BUTTON ~~~~~~~~~~~~~~~*/
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".main-nav");
const cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = () => {
  menu.classList.add("active");
  menuBtn.classList.add("hide");

  cancelBtn.onclick = () => {
    menu.classList.remove("active");
    menuBtn.classList.remove("hide");
  };
};
/*~~~~~~~~~~~~~~~ Creat popup witch The Image ~~~~~~~~~~~~~~~*/
let ourGallery = document.querySelectorAll(".projects-container img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Creat Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);
    

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Propup Box
    popupBox.className = "popup-box";

    // Create The Image
    let popupImage = document.createElement("img");

    console.log(img.src);

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Bpx
    popupBox.appendChild(popupImage);

    // Append The Poup Box To Body
    document.body.appendChild(popupBox);

    // create The Close Span
    let closeButton = document.createElement("span");

    // Creat The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = "close-button";

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

//  Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    //  Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

/*~~~~~~~~~~~~~~~ START SLAIDER REVIEWS ~~~~~~~~~~~~~~~*/
// Select the carousel container element
const carousel = document.querySelector(".carousel");

// Select all arrow buttons within the container
const arrowBtns = document.querySelectorAll(".container i");

// Determine the width of the first card in the carousel
const firstCardWidth = carousel.querySelector(".box").offsetWidth;

// isDragging: A boolean flag to track whether the mouse button is being held down.
let isDragging = false,
  startX,
  startScrollLeft;

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((arrowButton) => {
  arrowButton.addEventListener("click", function () {
    // Determine the direction of scrolling based on the arrow button clicked
    if (arrowButton.id === "left") {
      // If left arrow button clicked, scroll left by subtracting the width of the first card
      carousel.scrollLeft -= firstCardWidth;
    } else {
      // If right arrow button clicked, scroll right by adding the width of the first card
      carousel.scrollLeft += firstCardWidth;
    }
  });
});

// Event handler for when mouse drag starts
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor position and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

// Event handler for mouse dragging
const dragging = (e) => {
  if (!isDragging) return; // If isDragging is false, return from here
  // Update the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

// Event handler for when mouse drag stops
const dragStop = (e) => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

// Add event listeners for mouse events
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);


/*~~~~~~~~~~~~~~~ END SLAIDER REVIEWS ~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~ SCROLL REVEAL ANIMATION ~~~~~~~~~~~~~~~*/
const screenWidth = window.innerWidth;

let distanceValue;

if (screenWidth <= 768) {
  // If screen width is less than or equal to 768 pixels (e.g., for mobile devices)
  distanceValue = "20px";
} else {
  // For larger screens (e.g., desktops, tablets)
  distanceValue = "60px";
}
const sr = ScrollReveal({
  origin: "top",
  distance: distanceValue,
  duration: 3000,
  delay: 400,
});
sr.reveal(".logo", { origin: "left" });
sr.reveal(".main-nav", { origin: "right" });
sr.reveal(".home__image");
sr.reveal(".text", { origin: "bottom" });
sr.reveal(".category__box", { interval: 300 });
sr.reveal(".about__img", { origin: "bottom" });
sr.reveal(".about__content", { origin: "top" });
sr.reveal(".customer__review", { origin: "right" });
sr.reveal(".articles__boxes", { origin: "left" });
sr.reveal(".contact-text", { origin: "left" });
sr.reveal(".contact-form", { origin: "right" });
sr.reveal(".footer");


/*~~~~~~~~~~~~~~~  ENdSCROLL REVEAL ANIMATION ~~~~~~~~~~~~~~~*/
