//Mettre le code JavaScript lié à la page photographer.html
import { lightbox } from './../utils/lightbox.js'


async function getPhotographer() {
    const folio = document.getElementById('folio')
    const photographerSection = document.getElementById('photograph-header')
    const photographerButtonSection = document.getElementsByClassName('contact_button')
    const priceSection = document.getElementById('price')
    const photographerPhoto = document.getElementById('photographer-photo')
    let url = new URL(window.location.toLocaleString()).searchParams
    const id = url.get('id');
    let likes = 0

    let photographers = await fetch('./../../data/photographers.json')
        .then(response => response.json())
        .then(function datas(data) {
            let photographer = data.photographers.find(photographer => photographer.id == id)
            const { div, img } = photographerFactory(photographer)

            photographerSection.insertBefore(div, photographerSection.children[0])
            photographerPhoto.appendChild(img)

            data.media.find(function tri(Medias) {
                if (id == Medias.photographerId) {
                    folio.appendChild(MediaFactory(Medias, photographer.name))
                    likes += Medias.likes

                }
            })
            const { span, span2 } = priceFactory(photographer.price, likes)
            priceSection.appendChild(span)
            priceSection.appendChild(span2)
        })

    lightbox.init()
}

function MediaFactory(Media, name) {
    let array = name.split(" ")
    let firstname = array[0]
    const a = document.createElement('a')
    a.className = "img_folio"

    if (Media.image) {
        const link = `./assets/folio/${firstname}/${Media.image}`
        const img = document.createElement('img')
        img.setAttribute('src', link)
        a.appendChild(img)
        a.setAttribute('href', link)
    } else {
        const link = `./assets/folio/${firstname}/${Media.video}`
        const video = document.createElement('video')
        const canvas = document.createElement("CANVAS");
        video.setAttribute('src', link)
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        a.appendChild(canvas)
    }
    const div2 = document.createElement('div')

    const title = document.createElement('span')
    title.textContent = Media.title
    div2.appendChild(title)

    const like = document.createElement('span')
    like.textContent = Media.likes
    const heart = document.createElement('i')
    heart.className = "fa-solid fa-heart"
    like.appendChild(heart)
    div2.appendChild(like)
    a.appendChild(div2)

    return a

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
    const span = document.createElement('span')
    span.textContent = `${likes} `
    const heart = document.createElement('i')
    heart.className = "fa-solid fa-heart"
    span.appendChild(heart)

    const span2 = document.createElement('span')
    span2.textContent = `${price}€ / jour `

    return { span, span2 }
}


getPhotographer();
