import { openLightbox } from '../lightbox.js'
import { createArticleQuote } from './create-article-quote.js'

export const updateCasesContent = () => {
  if (window.location.pathname.includes('/customer-projects/')) {
    document.querySelectorAll('p').forEach(paragraph => {
      const text = paragraph.textContent

      if (text.includes('{{Quote') || text.includes('<<Quote')) {
        createArticleQuote(paragraph)
      }
    })

    // Add icons to titles
    const headerClasses = {
      Goals: 'goals',
      Goal: 'goals',
      'Work process': 'work-process',
      'Work proces': 'work-process',
      Results: 'results',
      Results: 'results',
    }
    document
      .querySelector('[data-article="content"]')
      .querySelectorAll('h2')
      .forEach(h2 => {
        const text = h2.textContent.trim()
        if (headerClasses[text]) {
          h2.classList.add(
            'resources-cases__title-and-icon',
            headerClasses[text]
          )
        }
      })

    // hover images
    const gridImages = document.querySelectorAll(
      '[data-article-case="grid-media-img"]'
    )
    const largeImage = document.querySelector(
      '[data-article-case="media-img-large"]'
    )

    largeImage?.addEventListener('click', event => {
      event.preventDefault()
      openLightbox(event.currentTarget.getAttribute('src'))
    })

    const gridVideo = document.querySelector(
      '[data-article-case="grid-media-video"]'
    )
    const largeVideo = document.querySelector(
      '[data-article-case="media-video-large"]'
    )

    // Логика для изображений
    if (gridImages.length > 0 && largeImage) {
      gridImages.forEach(item => {
        item.addEventListener('mouseover', () => {
          const src = item.querySelector('img').getAttribute('src')
          largeImage.setAttribute('src', src)

          largeImage.classList.remove('hide')
          largeVideo.classList.add('hide')
        })

        if (window.innerWidth < 768) {
          item.querySelector('img').addEventListener('click', event => {
            event.preventDefault()
            console.log(1)
            openLightbox(event.currentTarget.getAttribute('src'))
          })
        }
      })
    }

    if (gridVideo && largeVideo) {
      gridVideo.addEventListener('mouseover', () => {
        largeImage.classList.add('hide')
        largeVideo.classList.remove('hide')
      })
    }

    if (gridImages.length > 0) {
      const firstImage = gridImages[0]
      const mouseoutEvent = new Event('mouseover', {
        bubbles: true,
        cancelable: true,
      })
      firstImage.dispatchEvent(mouseoutEvent)
    }

    // move video to images grid
    const listImages = document.querySelector('[fs-cmsstatic-element="list"]')
    const videoItem = document.querySelector(
      '[data-article-case="grid-media-video"]'
    )
    if (videoItem) {
      if (videoItem.children.length > 0) {
        videoItem.classList.remove('hide')
        listImages.insertAdjacentElement('afterbegin', videoItem)
      } else {
        videoItem.remove()
      }
    }
  }
}

// const lightboxWrap = document.querySelector(
//   '[data-article="lightbox-wrap"]'
// )
// const lightbox = document.querySelector('[data-article="lightbox"]')
// if (lightboxWrap && lightbox) {
//   lightboxWrap.setAttribute('src', src)
//   lightbox.setAttribute('src', src)
