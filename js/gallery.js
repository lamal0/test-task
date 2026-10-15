const Gallery = (() => {
  let index = 0;
  let track, dotsEl, galleryEl;
  let dragStartX = null;
  let dragDeltaX = 0;

  function render() {
    track.innerHTML = PRODUCTS.map(
      (p) => `
      <div class="gallery-slide">
        <img src="${p.image}" alt="${p.alt[currentLang] ?? p.alt.en}" />
        <div class="gallery-caption">
          <span class="gallery-name">${p.name[currentLang] ?? p.name.en}</span>
          <span class="gallery-blurb">${p.blurb[currentLang] ?? p.blurb.en}</span>
        </div>
      </div>`
    ).join("");

    dotsEl.innerHTML = PRODUCTS.map(
      (p, i) => `
      <button
        class="gallery-dot${i === index ? " is-active" : ""}"
        type="button"
        data-index="${i}"
        aria-label="${t("gallery.goToLabel")} ${i + 1}"
        aria-current="${i === index}"
      ></button>`
    ).join("");

    goTo(index, { skipRender: true });
  }

  function goTo(newIndex, opts = {}) {
    index = (newIndex + PRODUCTS.length) % PRODUCTS.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsEl.querySelectorAll(".gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
      dot.setAttribute("aria-current", String(i === index));
    });
  }

  function attachEvents() {
    document.querySelector(".gallery-prev").addEventListener("click", () => goTo(index - 1));
    document.querySelector(".gallery-next").addEventListener("click", () => goTo(index + 1));

    dotsEl.addEventListener("click", (e) => {
      const dot = e.target.closest(".gallery-dot");
      if (dot) goTo(Number(dot.dataset.index));
    });

    galleryEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    track.addEventListener("pointerdown", (e) => {
      dragStartX = e.clientX;
      dragDeltaX = 0;
    });
    track.addEventListener("pointermove", (e) => {
      if (dragStartX === null) return;
      dragDeltaX = e.clientX - dragStartX;
    });
    const endDrag = () => {
      if (dragStartX === null) return;
      const SWIPE_THRESHOLD = 50;
      if (dragDeltaX > SWIPE_THRESHOLD) goTo(index - 1);
      else if (dragDeltaX < -SWIPE_THRESHOLD) goTo(index + 1);
      dragStartX = null;
      dragDeltaX = 0;
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);

    document.addEventListener("langchange", render);
  }

  function init() {
    track = document.getElementById("gallery-track");
    dotsEl = document.getElementById("gallery-dots");
    galleryEl = document.querySelector(".hero-gallery");
    render();
    attachEvents();
  }

  return { init };
})();
