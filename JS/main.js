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
    header.style.background = "#12141c";
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

/*~~~~~~~~~~~~~~~ NENU BUTTON ~~~~~~~~~~~~~~~*/
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

/*~~~~~~~~~~~~~~~ SCROLL REVEAL ANIMATION ~~~~~~~~~~~~~~~*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(".home__image");
sr.reveal(".text", { origin: "bottom" });

sr.reveal(".category__box", { interval: 300 });

sr.reveal(".about__img", { origin: "bottom" });
sr.reveal(".about__content", { origin: "top" });

sr.reveal(".customer__review", { origin: "right" });

sr.reveal(".articles__boxes", { origin: "left" });

sr.reveal(".contact-text", { origin: "left" });

sr.reveal(".contact-from", { origin: "lright" });

sr.reveal(".footer");
