// ============================================================
// Check if Theres Local Storage Color Option
// ============================================================
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Toggle Settings Box
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    localStorage.setItem("color_option", e.target.dataset.color);
    e.target.parentElement.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
  });
});

// ============================================================
// Scroll — top button + sticky header
// ============================================================
let span   = document.querySelector(".up");
let header = document.querySelector(".header");

window.onscroll = function () {
  span.style.display = window.scrollY >= 600 ? "block" : "none";
  header.style.background = window.scrollY >= 1 ? "#161718" : "";
};

span.onclick = function () {
  window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
};

// ============================================================
// MENU BUTTON
// ============================================================
const menuBtn   = document.querySelector(".menu-btn");
const menu      = document.querySelector(".main-nav");
const cancelBtn = document.querySelector(".cancel-btn");

menuBtn.onclick = () => {
  menu.classList.add("active");
  menuBtn.classList.add("hide");
  cancelBtn.onclick = () => {
    menu.classList.remove("active");
    menuBtn.classList.remove("hide");
  };
};

// ============================================================
// PROJECTS FILTER — pj-filter-btn system
// ============================================================
(function () {
  const filterBtns = document.querySelectorAll(".pj-filter-btn");
  const cards      = document.querySelectorAll(".pj-grid .filterable_card");
  const countEl    = document.querySelector(".pj-count-shown");

  function updateCount() {
    const visible = document.querySelectorAll(".pj-grid .filterable_card:not(.pj-hide)").length;
    if (countEl) countEl.textContent = visible;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.name;

      cards.forEach((card) => {
        if (filter === "all" || card.dataset.name === filter) {
          card.classList.remove("pj-hide");
        } else {
          card.classList.add("pj-hide");
        }
      });

      updateCount();
    });
  });

  updateCount();
})();

// ============================================================
// PROJECT IMAGE GALLERY POPUP
// ============================================================
(function () {

  function openPopup(card) {
    const title    = card.querySelector(".pj-card-title")?.innerText  || "";
    const year     = card.querySelector(".pj-year")?.innerText        || "";
    const desc     = card.querySelector(".pj-card-desc")?.innerText   || "";
    const chips    = [...(card.querySelectorAll(".pj-chip") || [])].map((c) => c.innerText);

    // CTA links — handle private/coming-soon cards gracefully
    const liveAnchor  = card.querySelector(".pj-btn-live");
    const codeAnchor  = card.querySelector(".pj-btn-ghost:not(.pj-btn-disabled)");
    const liveLink    = (liveAnchor && liveAnchor.href && !liveAnchor.href.endsWith("#")) ? liveAnchor.href : null;
    const codeLink    = (codeAnchor && codeAnchor.href && !codeAnchor.href.endsWith("#")) ? codeAnchor.href : null;
    const isPrivate   = !liveLink && !codeLink;

    // Images: data-images attribute or fallback to first img
    const firstImg  = card.querySelector("img");
    const rawImages = card.dataset.images || (firstImg ? firstImg.src : "");
    const images    = rawImages.split(",").map((s) => s.trim()).filter(Boolean);
    let current     = 0;

    if (images.length === 0) return;

    // ── Build overlay ──
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // ── Build modal ──
    const modal = document.createElement("div");
    modal.className = "popup-box";
    modal.innerHTML = `
      <span class="close-button">&#10005;</span>

      <div class="popup-gallery">
        <button class="gallery-btn gallery-prev" ${images.length < 2 ? "style='display:none'" : ""}>&#8249;</button>
        <div class="gallery-img-wrap">
          <img class="gallery-main-img" src="${images[0]}" alt="${title}" />
        </div>
        <button class="gallery-btn gallery-next" ${images.length < 2 ? "style='display:none'" : ""}>&#8250;</button>
      </div>

      <div class="gallery-dots">
        ${images.map((_, i) => `<span class="gallery-dot ${i === 0 ? "active" : ""}" data-index="${i}"></span>`).join("")}
      </div>

      <div class="gallery-counter">${images.length > 1 ? `1 / ${images.length}` : ""}</div>

      <div class="popup-details">
        <h3>${title}</h3>
        <span class="popup-year">${year}</span>
        <p>${desc}</p>
        <ul class="popup-tags">
          ${chips.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="popup-links">
          ${isPrivate
            ? `<span class="popup-private-badge"><i class="fa-solid fa-lock"></i> Private Repository</span>
               <span class="popup-coming-badge">🚀 Coming Soon</span>`
            : `${codeLink ? `<a href="${codeLink}" target="_blank"><i class="fa-brands fa-github"></i> Code</a>` : ""}
               ${liveLink ? `<a href="${liveLink}" target="_blank"><i class="fa-solid fa-display"></i> Live Demo</a>` : ""}`
          }
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // ── Gallery logic ──
    const mainImg = modal.querySelector(".gallery-main-img");
    const dots    = modal.querySelectorAll(".gallery-dot");
    const counter = modal.querySelector(".gallery-counter");

    const goTo = (index) => {
      current = (index + images.length) % images.length;
      mainImg.style.opacity = "0";
      setTimeout(() => {
        mainImg.src = images[current];
        mainImg.style.opacity = "1";
      }, 180);
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
      if (counter) counter.textContent = images.length > 1 ? `${current + 1} / ${images.length}` : "";
    };

    modal.querySelector(".gallery-prev").addEventListener("click", (e) => { e.stopPropagation(); goTo(current - 1); });
    modal.querySelector(".gallery-next").addEventListener("click", (e) => { e.stopPropagation(); goTo(current + 1); });
    dots.forEach((dot) => dot.addEventListener("click", (e) => { e.stopPropagation(); goTo(parseInt(dot.dataset.index)); }));

    // Touch / swipe
    let touchStartX = 0;
    const imgWrap = modal.querySelector(".gallery-img-wrap");
    imgWrap.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; });
    imgWrap.addEventListener("touchend",   (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    // Animate in
    requestAnimationFrame(() => { overlay.classList.add("show"); modal.classList.add("show"); });

    // Close
    const closePopup = () => {
      overlay.classList.remove("show");
      modal.classList.remove("show");
      setTimeout(() => { overlay.remove(); modal.remove(); }, 300);
    };

    modal.querySelector(".close-button").addEventListener("click", closePopup);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closePopup(); });

    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape")     { closePopup(); document.removeEventListener("keydown", onKey); }
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft")  goTo(current - 1);
    });
  }

  // ── Attach click to each card ──
  document.querySelectorAll(".pj-grid .pj-card").forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", (e) => {
      // ✅ FIX: disabled buttons & coming-soon spans have no pointer-events,
      // so we check the card-level click — if the real target is NOT a working link/button, open popup
      const clickedLink = e.target.closest("a[href]:not([href='#'])");
      const clickedBtn  = e.target.closest("button:not(.pj-btn-disabled)");

      // If a real working anchor or enabled button was clicked, let it through
      if (clickedLink || clickedBtn) return;

      // Everything else (disabled spans, card body, chips, etc.) opens the popup
      openPopup(card);
    });
  });

})();

// ============================================================
// REVIEWS SLIDER
// ============================================================
const carousel       = document.querySelector(".carousel");
const arrowBtns      = document.querySelectorAll(".container i");
const firstCardWidth = carousel.querySelector(".box").offsetWidth;

let isDragging = false, startX, startScrollLeft;

arrowBtns.forEach((arrowButton) => {
  arrowButton.addEventListener("click", function () {
    if (arrowButton.id === "left") {
      carousel.scrollLeft -= firstCardWidth;
    } else {
      carousel.scrollLeft += firstCardWidth;
    }
  });
});

const dragStart = (e) => { isDragging = true; carousel.classList.add("dragging"); startX = e.pageX; startScrollLeft = carousel.scrollLeft; };
const dragging  = (e) => { if (!isDragging) return; carousel.scrollLeft = startScrollLeft - (e.pageX - startX); };
const dragStop  = ()  => { isDragging = false; carousel.classList.remove("dragging"); };

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup",   dragStop);

// ============================================================
// CERTIFICATE IMAGE POPUP — click to view full image
// ============================================================
(function () {
  document.querySelectorAll(".cert-card").forEach((card) => {
    card.addEventListener("click", () => {
      const imgSrc = card.dataset.images;
      if (!imgSrc) return;

      const overlay = document.createElement("div");
      overlay.className = "popup-overlay";
      document.body.appendChild(overlay);

      const modal = document.createElement("div");
      modal.className = "popup-box";
      modal.style.cssText = "max-width:860px;background:#0a0a0d;";
      modal.innerHTML = `
        <span class="close-button">&#10005;</span>
        <div style="border-radius:14px;overflow:hidden;">
          <img src="${imgSrc}" alt="Certificate"
            style="width:100%;height:auto;display:block;" />
        </div>
      `;
      document.body.appendChild(modal);

      requestAnimationFrame(() => {
        overlay.classList.add("show");
        modal.classList.add("show");
      });

      const close = () => {
        overlay.classList.remove("show");
        modal.classList.remove("show");
        setTimeout(() => { overlay.remove(); modal.remove(); }, 300);
      };

      modal.querySelector(".close-button").addEventListener("click", close);
      overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
      document.addEventListener("keydown", function onKey(e) {
        if (e.key === "Escape") { close(); document.removeEventListener("keydown", onKey); }
      });
    });
  });
})();

// ============================================================
// SCROLL REVEAL
// ============================================================
const screenWidth   = window.innerWidth;
const distanceValue = screenWidth <= 768 ? "10px" : "60px";

const sr = ScrollReveal({ origin: "top", distance: distanceValue, duration: 1500, delay: 400 });

sr.reveal(".home__image");
sr.reveal(".text",             { origin: "bottom" });
sr.reveal(".category__box",    { interval: 300 });
sr.reveal(".pj-grid",          { origin: "bottom", interval: 150 });
sr.reveal(".about__img",       { origin: "bottom" });
sr.reveal(".about__content",   { origin: "top" });
sr.reveal(".customer__review", { origin: "right" });
sr.reveal(".articles__boxes",  { origin: "left" });
sr.reveal(".contact-text",     { origin: "left" });
sr.reveal(".contact-form",     { origin: "right" });
sr.reveal(".footer");