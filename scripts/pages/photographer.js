//Mettre le code JavaScript lié à la page photographer.html


async function getPhotographer() {
    let url = new URL(window.location.toLocaleString()).searchParams
    const id = url.get('id');
    const div = document.createElement('div')

    let photographers = await fetch('./../../data/photographers.json')
        .then(response => response.json())
        .then(function datas(data) {
            let photographer = data.photographers.find(photographer => photographer.id == id)
            console.log(photographer)
            data.media.find(function tri(Medias) {
                if (id == Medias.photographerId) {
                    photographerFactory(Medias)
                }
            })
        })
}

function photographerFactory(Media) {
    const div = document.createElement('div')

    if (Media.image) {
        const link = `./asset/images/${Media.title}`
        const img = document.createElement('img')
        img.setAttribute('src', link)
        div.appendChild(img)
    } else {
        const link = `./asset/videos/${Media.title}`
        const video = document.createElement('video')
        video.setAttribute('src', link)
        //div.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
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
    div.appendChild(div2)



}

getPhotographer();
