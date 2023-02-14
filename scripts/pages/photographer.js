//Mettre le code JavaScript lié à la page photographer.html
import { lightbox } from './../utils/lightbox.js'


async function getPhotographer() {
    const folio = document.getElementById('folioContainer')
    const photographerSection = document.getElementById('photograph-header')
    const priceSection = document.getElementById('price')
    const photographerPhoto = document.getElementById('photographer-photo')
    let url = new URL(window.location.toLocaleString()).searchParams
    const id = url.get('id');
    let likes = 0
    let photographer = {}
    let album = []
    let divFolio = document.createElement('div')
    divFolio.setAttribute('id', 'folio')

    let photographers = await fetch('./../../data/photographers.json')
        .then(response => response.json())
        .then(function datas(data) {
            photographer = data.photographers.find(photographer => photographer.id == id)
            const { div, img } = photographerFactory(photographer)

            photographerSection.insertBefore(div, photographerSection.children[0])
            photographerPhoto.appendChild(img)

            data.media.find(function tri(medias) {
                if (id == medias.photographerId) {
                    album.push(medias)
                    divFolio.appendChild(MediaFactory(medias, photographer.name, id))
                    likes += medias.likes
                }
            })
            folio.appendChild(divFolio)
            const { divLikes, span2 } = priceFactory(photographer.price, likes)
            priceSection.appendChild(divLikes)
            priceSection.appendChild(span2)
        })
    sortGallery(album, photographer.name, id)
    lightbox.init()
}

function MediaFactory(Media, name, id) {
    let array = name.split(" ")
    let firstname = array[0]
    let link = ''
    const div = document.createElement('div')
    const a = document.createElement('a')
    const a1 = document.createElement('a')
    const a2 = document.createElement('a')
    div.className = "img_folio"

    if (Media.image) {
        link = `./assets/folio/${firstname}/${Media.image}`
        const img = document.createElement('img')
        img.setAttribute('src', link)
        a.appendChild(img)
        a.setAttribute('href', link)
        div.appendChild(a)
    } else {
        const link = `./assets/folio/${firstname}/${Media.video}`
        const video = document.createElement('video')
        const canvas = document.createElement("CANVAS");
        video.setAttribute('src', link)
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        div.appendChild(canvas)
    }
    const div2 = document.createElement('div')

    const title = document.createElement('span')
    title.textContent = Media.title
    a1.appendChild(title)
    a1.setAttribute('href', link)
    div2.appendChild(a1)

    const like = document.createElement('span')
    like.textContent = Media.likes
    const heart = document.createElement('i')
    heart.className = "fa-solid fa-heart"
    a2.appendChild(heart)
    a2.setAttribute('href', '#')
    a2.setAttribute('id', id)
    a2.addEventListener('click', getLikes)
    like.appendChild(a2)
    div2.appendChild(like)
    div.appendChild(div2)

    return div

}

function photographerFactory(photographer) {
    const div = document.createElement('div')
    div.className = "photographer-detail"

    const h2 = document.createElement('h2')
    h2.textContent = photographer.name
    div.appendChild(h2)

    const span = document.createElement('span')
    span.textContent = `${photographer.city} ${photographer.country}`
    div.appendChild(span)

    const span2 = document.createElement('span')
    span2.textContent = photographer.tagline
    div.appendChild(span2)

    const img = document.createElement('img')
    let picture = `./assets/photographers/${photographer.portrait}`;
    img.setAttribute('src', picture)

    return { div, img }
}

function priceFactory(price, likes) {
    const divLikes = document.createElement('div')
    const span = document.createElement('span')
    span.classList.add('likes')
    span.textContent = ` ${likes} `
    const heart = document.createElement('i')
    heart.className = "fa-solid fa-heart"
    divLikes.appendChild(span)
    divLikes.appendChild(heart)

    const span2 = document.createElement('span')
    span2.textContent = `${price}€ / jour `

    return { divLikes, span2 }
}

function getLikes(e) {
    e.preventDefault()
    let id = e.currentTarget.getAttribute('id')
    let likes = e.target.parentElement.parentElement
    likes.textContent = (+likes.textContent) + 1

    let likesBar = document.getElementsByClassName('likes')
    console.log(likesBar[0])
    likesBar[0].textContent = `${(+likesBar[0].textContent) + 1} `
}


function sortGallery(album, name, id) {
    let selector = document.getElementById('select')
    selector.addEventListener('change', sort)

    function sort(e) {
        let select = e.target.value;
        console.log(album)
        switch (select) {
            case 'titre':
                album.sort((a, b) => {
                    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
                let div = document.createElement('div')
                div.setAttribute('id', 'folio')
                album.forEach(image => {
                    div.appendChild(MediaFactory(image, name, id))
                })
                const divFolio = document.getElementById('folio')
                divFolio.remove()

                const folio = document.getElementById('folioContainer')
                folio.appendChild(div)
                lightbox.init()
                break;
            case 'date':
                album.sort((a, b) => {
                    const nameA = a.date.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.date.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
                break;
            default:
                console.log(`Sorry`);
        }
    }

}


getPhotographer();
