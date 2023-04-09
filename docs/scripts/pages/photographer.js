//Mettre le code JavaScript lié à la page photographer.html
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

function MediaFactory(media, name, id) {
  let array = name.split(" ");
  let firstname = array[0];
  let link = "";
  const div = document.createElement("div");
  const a = document.createElement("a");
  a.setAttribute("aria-label", media.title);
  const a1 = document.createElement("a");
  a1.setAttribute("aria-label", media.title);
  const a2 = document.createElement("a");
  a2.setAttribute("aria-label", media.title);
  div.className = "img_folio";

  if (media.image) {
    link = `./assets/folio/${firstname}/${media.image}`;
    const img = document.createElement("img");
    img.setAttribute("alt", media.title);
    img.setAttribute("src", link);
    a.appendChild(img);
    a.setAttribute("href", link);
    div.appendChild(a);
  } else {
    const link = `./assets/folio/${firstname}/${media.video}`;
    const video = document.createElement("video");
    video.setAttribute("src", link);
    video.width = "350";
    video.height = "300";
    div.appendChild(video);
  }
  const div2 = document.createElement("div");

  const title = document.createElement("span");
  title.textContent = media.title;
  a1.appendChild(title);
  a1.setAttribute("href", link);
  div2.appendChild(a1);

  const like = document.createElement("span");
  like.textContent = media.likes;
  const heart = document.createElement("i");
  heart.className = "fa-solid fa-heart";
  a2.appendChild(heart);
  a2.setAttribute("href", "#");
  a2.addEventListener("click", getLikes);
  like.appendChild(a2);
  div2.appendChild(like);
  div.appendChild(div2);

  return div;
}

function photographerFactory(photographer) {
  const div = document.createElement("div");
  div.className = "photographer-detail";

  const h2 = document.createElement("h2");
  h2.textContent = photographer.name;
  div.appendChild(h2);

  const span = document.createElement("span");
  span.classList.add("photographer-country");
  span.textContent = `${photographer.city} ${photographer.country}`;
  div.appendChild(span);

  const span2 = document.createElement("span");
  span2.textContent = photographer.tagline;
  div.appendChild(span2);

  const img = document.createElement("img");
  let picture = `./assets/photographers/${photographer.portrait}`;
  img.setAttribute("src", picture);
  img.setAttribute("alt", "photo du photographe");

  return { div, img };
}

function priceFactory(price, likes) {
  const divLikes = document.createElement("div");
  const span = document.createElement("span");
  span.classList.add("likes");
  span.textContent = ` ${likes} `;
  const heart = document.createElement("i");
  heart.className = "fa-solid fa-heart";
  divLikes.appendChild(span);
  divLikes.appendChild(heart);

  const span2 = document.createElement("span");
  span2.textContent = `${price}€ / jour `;

  return { divLikes, span2 };
}

function getLikes(e) {
  e.preventDefault();
  let id = e.currentTarget.getAttribute("id");
  let likes = e.target.parentElement.parentElement;
  likes.textContent = +likes.textContent + 1;

  let likesBar = document.getElementsByClassName("likes");
  console.log(likesBar[0]);
  likesBar[0].textContent = `${+likesBar[0].textContent + 1} `;
}

function sortGallery(album, name, id) {
  let selector = document.getElementById("select");
  selector.addEventListener("change", sort);

  function sort(e) {
    let select = e.target.value;
    console.log(album);
    switch (select) {
      case "titre":
        album.sort((a, b) => {
          const e1 = a.title.toUpperCase(); // ignore upper and lowercase
          const e2 = b.title.toUpperCase(); // ignore upper and lowercase
          if (e1 < e2) {
            return -1;
          }
          if (e1 > e2) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        console.log(album);
        buildGallery(album, name, id);

        break;

      case "popularite":
        album.sort((a, b) => {
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
        buildGallery(album, name, id);
        console.log(album);
        break;

      case "date":
        album.sort((a, b) => {
          const e1 = a.date; // ignore upper and lowercase
          const e2 = b.date; // ignore upper and lowercase
          if (e1 < e2) {
            return -1;
          }
          if (e1 > e2) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        buildGallery(album, name, id);
        break;
      default:
        console.log(`Sorry`);
    }
  }
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
