export class lightbox {
    static init() {
        const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"]').forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new lightbox(e.currentTarget.getAttribute('href'))
        }))
    }

    constructor(url) {
        const element = this.buildDom(url)
        document.body.appendChild(element)
    }

    buildDom(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.setAttribute("id", "lightbox");
        dom.innerHTML = ` <button id="lightbox__close">Fermer</button>
      <button class="lightbox__next">Suivant</button>
      <button class="lightbox__preview">Précédent</button>
      <div class="lightbox__container">
        <img src="${url}" alt="">
      </div>`
        return dom
    }
}
