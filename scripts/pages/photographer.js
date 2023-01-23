//Mettre le code JavaScript lié à la page photographer.html


async function getPhotographer() {
    let url = new URL(window.location.toLocaleString()).searchParams
    let medias = [];
    const id = url.get('id');

    let photographe = await fetch('./../../data/photographers.json')
        .then(response => response.json())
        .then(function datas(data) {
            data = data.media
            data.find(function tri(photographer) {
                if (id == photographer.photographerId) {
                    medias.push(photographer)
                }
            })
            return medias;
        })
}

getPhotographer();
