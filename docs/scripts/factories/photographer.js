export function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");

    a.setAttribute("href", "./photographer.html?id=" + id);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name + " " + tagline);
    img.setAttribute("aria-label", "");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const span1 = document.createElement("span");
    span1.textContent = city + ", " + country;
    span1.className = "location";

    const span2 = document.createElement("span");
    span2.textContent = tagline;
    span2.className = "tagline";

    const span3 = document.createElement("span");
    span3.textContent = price + "€/jour";
    span3.className = "price";

    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(a);
    article.appendChild(span1);
    article.appendChild(span2);
    article.appendChild(span3);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

export function getUserBannerDOM(photographer) {
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
  img.setAttribute("alt", "");

  return { div, img };
}
export function priceFactory(price, likes) {
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

export function MediaFactory(media, name) {
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

  function getLikes(e) {
    e.preventDefault();
    let likes = e.target.parentElement.parentElement;
    likes.textContent = +likes.textContent + 1;

    let likesBar = document.getElementsByClassName("likes");
    console.log(likesBar[0]);
    likesBar[0].textContent = `${+likesBar[0].textContent + 1} `;
  }
}
