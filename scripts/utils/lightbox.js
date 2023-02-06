export class lightbox {
    static init() {
        const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new lightbox(e.currentTarget.getAttribute('href'), gallery)
        }))
    }

    constructor(url, gallery) {
        this.url = url
        const element = this.buildDom()
        document.body.appendChild(element)
        this.loadImage(url)
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

    loadImage(url) {
        const image = new Image()
        const container = document.querySelector('.lightbox__container')
        if (container.hasChildNodes()) { container.removeChild(container.children[0]) }
        image.src = url
        container.appendChild(image)
        this.url = url
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
        let index = this.gallery.findIndex(image => image === this.url)
        if (index == this.gallery.length - 1) {
            index = -1
        }
        this.loadImage(this.gallery[index + 1])
    }

    prev(e) {
        e.preventDefault()
        let index = this.gallery.findIndex(image => image === this.url)
        if (index == 0) {
            index = this.gallery.length
        }
        this.loadImage(this.gallery[index - 1])
    }
}
