import { openLightbox } from '../lightbox.js'
import { createCaseQuoteInside } from './create-case-quote-inside.js'

const moveCaseMedia = paragraph => {
  const media = document.querySelector('[data-case="media"]')
  if (media) {
    paragraph.parentNode?.insertBefore(media, paragraph)
  }
  paragraph.remove()
}

export const updateCasesContent = () => {
  if (
    window.location.pathname.includes('/customer-projects/') ||
    window.location.pathname.includes('/case-studies/')
  ) {
    document.querySelectorAll('p').forEach(paragraph => {
      const text = paragraph.textContent

      if (text.includes('{{Media') || text.includes('<<Media')) {
        moveCaseMedia(paragraph)
      }

      if (text.includes('{{Quote') || text.includes('<<Quote')) {
        createCaseQuoteInside(paragraph)
      }
    })

    // hover images
    const gridImages = document.querySelectorAll('[data-case="grid-media-img"]')
    const largeImage = document.querySelector('[data-case="media-img-large"]')

    largeImage?.addEventListener('click', event => {
      event.preventDefault()
      openLightbox(event.currentTarget.getAttribute('src'))
    })

    if (gridImages.length > 0 && largeImage) {
      gridImages.forEach(item => {
        item.addEventListener('mouseover', () => {
          const src = item.querySelector('img').getAttribute('src')
          largeImage.setAttribute('src', src)

          largeImage.classList.remove('hide')
        })

        if (window.innerWidth < 768) {
          item.querySelector('img').addEventListener('click', event => {
            event.preventDefault()

            openLightbox(event.currentTarget.getAttribute('src'))
          })
        }
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
  }
}
