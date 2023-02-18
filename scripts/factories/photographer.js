// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");

    a.setAttribute("href", "./photographer.html?id=" + id);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name + " " + tagline);
    img.setAttribute("aria-label", "Image du photographe");

    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("aria-label", "Nom du photographe");

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

async function init() {
  // Récupère les datas des photographes
  // eslint-disable-next-line no-undef
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
