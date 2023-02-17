export class lightbox {
    static init() {
        let link = ""
        let type = ""

        //const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"]'))
        const links = Array.from(document.querySelectorAll('.img_folio > a, .img_folio > video'))
        const gallery = links.map((e) => {
            if (e.getAttribute('src')) {
                let lien = e.getAttribute('src')
                let typeContenu = "video"
                return { lien, typeContenu }
            } else {
                let lien = e.getAttribute('href')
                let typeContenu = "img"
                return { lien, typeContenu }
            }
        })
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            if (e.currentTarget.getAttribute('src')) {
                link = e.currentTarget.getAttribute('src')
                type = "video"
            } else {
                link = e.currentTarget.getAttribute('href')
                type = "img"
            }
            new lightbox(link, type, gallery)
        }))
    }

    constructor(url, type, gallery) {
        this.type = type
        this.url = url
        const element = this.buildDom()
        document.body.appendChild(element)
        this.loadImage(url, type)
        this.gallery = gallery
        this.onKeyUp(this)
        this.closeModal()
    }

    buildDom() {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.setAttribute("id", "lightbox");
        dom.innerHTML = ` <button id="lightbox__close">Fermer</button>
                        <button class="lightbox__next">Suivant</button>
                        <button class="lightbox__preview">Précédent</button>
                        <div class="lightbox__container"></div>`
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__preview').addEventListener('click', this.prev.bind(this))
        return dom
    }

    loadImage(url, type) {
        const container = document.querySelector('.lightbox__container')
        switch (type) {
            case 'img':
                const image = new Image()
                if (container.hasChildNodes()) { container.removeChild(container.children[0]) }
                image.src = url
                container.appendChild(image)
                this.url = url
                this.type = "img"
                break;
            case 'video':
                const video = document.createElement("video");
                if (container.hasChildNodes()) { container.removeChild(container.children[0]) }
                video.src = url
                video.autoplay = true;
                video.controls = true;
                container.appendChild(video)
                this.url = url
                this.type = "video"
                break;
            default:
                console.log("bug")
        }



    }

    closeModal() {
        const closer = document.getElementById('lightbox')
        const lightboxClose = document.getElementById('lightbox__close')
        lightboxClose.addEventListener('click', close)

        function close() {
            closer.remove()
        }
    }

    onKeyUp(lightbox) {
        const closer = document.getElementById('lightbox')
        document.addEventListener('keyup', close)
        function close(e) {
            if (e.key == "Escape") {
                document.removeEventListener('keyup', close)
                closer.remove()
            }
            if (e.key == "ArrowRight") {
                lightbox.next(e)
            }
            if (e.key == "ArrowLeft") {
                lightbox.prev(e)
            }
        }
    }

    next(e) {
        e.preventDefault()
        let index = this.gallery.findIndex(image => image.lien === this.url)
        if (index == this.gallery.length - 1) {
            index = -1
        }
        this.loadImage(this.gallery[index + 1].lien, this.gallery[index + 1].typeContenu)
    }

    prev(e) {
        e.preventDefault()
        let index = this.gallery.findIndex(image => image.lien === this.url)
        if (index == 0) {
            index = this.gallery.length
        }
        this.loadImage(this.gallery[index - 1].lien, this.gallery[index - 1].typeContenu)
    }
}
