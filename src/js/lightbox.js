const lightboxWrapper = document.querySelector('[data-lightbox="wrap"]')

const closeLightbox = () => {
  lightboxWrapper?.classList.add('hide')
  document.removeEventListener('keydown', onLightboxEscKeydown)
}

const onLightboxEscKeydown = evt => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault()
    closeLightbox()
  }
}

export const openLightbox = imageSrc => {
  const lightboxImage = lightboxWrapper.querySelector('[data-lightbox="image"]')

  lightboxImage.src = imageSrc
  lightboxWrapper.classList.remove('hide')
  document.addEventListener('keydown', onLightboxEscKeydown)

  const lightboxCloseButton = lightboxWrapper.querySelector(
    '[data-lightbox="close"]'
  )
  lightboxCloseButton?.addEventListener('click', () => closeLightbox())
}
