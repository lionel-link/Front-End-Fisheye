//Mettre le code JavaScript lié à la page photographer.html
import { getData } from "./../utils/getData.js";
import { lightbox } from "./../utils/lightbox.js";
import {
  getUserBannerDOM,
  MediaFactory,
  priceFactory,
} from "../factories/photographer.js";
async function getPhotographer() {
  const folio = document.getElementById("folioContainer");
  const photographerSection = document.getElementById("photograph-header");
  const priceSection = document.getElementById("price");
  const photographerPhoto = document.getElementById("photographer-photo");
  let url = new URL(window.location.toLocaleString()).searchParams;
  const id = url.get("id");
  let likes = 0;
  let album = [];
  let photographer = {};
  let divFolio = document.createElement("div");
  divFolio.setAttribute("id", "folio");

  let data = await getData();
  photographer = data.photographers.find(
    (photographer) => photographer.id == id
  );
  // eslint-disable-next-line no-undef
  const { div, img } = getUserBannerDOM(photographer);

  photographerSection.insertBefore(div, photographerSection.children[0]);
  photographerPhoto.appendChild(img);

  data.media.sort((a, b) => {
    const e1 = a.likes; // ignore upper and lowercase
    const e2 = b.likes; // ignore upper and lowercase
    if (e1 < e2) {
      return -1;
    }
    if (e1 > e2) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  data.media.find(function tri(medias) {
    if (id == medias.photographerId) {
      album.push(medias);
      divFolio.appendChild(MediaFactory(medias, photographer.name, id));
      likes += medias.likes;
    }
  });
  folio.appendChild(divFolio);
  const { divLikes, span2 } = priceFactory(photographer.price, likes);
  priceSection.appendChild(divLikes);
  priceSection.appendChild(span2);
  sortGallery(album, photographer.name, id);
  lightbox.init();
}

function sortGallery(album, name, id) {
  let selector = document.getElementById("select");
  selector.addEventListener("change", sort);

  function sort(e) {
    let selected = e.target.value;
    sortingHelper(selected, album);
    buildGallery(album, name, id);
  }
}

function sortingHelper(selected, album) {
  return album.sort((a, b) => {
    const e1 = a[selected].toUpperCase
      ? a[selected].toUpperCase()
      : a[selected]; // ignore upper and lowercase
    const e2 = b[selected].toUpperCase
      ? b[selected].toUpperCase()
      : b[selected]; // ignore upper and lowercase
    if (e1 < e2) {
      return -1;
    }
    if (e1 > e2) {
      return 1;
    }

    // names must be equal
    return 0;
  });
}

function buildGallery(album, name, id) {
  let div = document.createElement("div");
  div.setAttribute("id", "folio");
  album.forEach((image) => {
    div.appendChild(MediaFactory(image, name, id));
  });
  const divFolio = document.getElementById("folio");
  divFolio.remove();

  const folio = document.getElementById("folioContainer");
  folio.appendChild(div);
  lightbox.init();
}

getPhotographer();
