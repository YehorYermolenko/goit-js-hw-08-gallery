import gallery from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

function createMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join(" ");
}

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  closeButton: document.querySelector(".lightbox__button"),
};

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

const markup = createMarkup(gallery);
refs.gallery.insertAdjacentHTML("beforeend", markup);

function onImageClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();
  refs.lightbox.classList.add("is-open");
  console.dir(e.target);
  changeLighboxImgSetting(e.target.src, e.target.dataset.source);
}

refs.gallery.addEventListener("click", onImageClick);

// Подмена значения атрибута src элемента img.lightbox__image.

function changeLighboxImgSetting(alt, src) {
  refs.lightboxImage.alt = alt;
  refs.lightboxImage.src = src;
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

function onCloseClick(e) {
  refs.lightbox.classList.remove("is-open");
  // Очистка значения атрибута src элемента img.lightbox__image.
  // Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  changeLighboxImgSetting("", "");
}

refs.closeButton.addEventListener("click", onCloseClick);
