import { modalWindow } from './modal-window.js'

/**
 * Add all listeners
 */
export const addAllListiners = () => {
  // disabled scroll after open menu hamburger mobile
  document.querySelector('[data-menu-icon]')?.addEventListener('click', () => {
    document.body.classList.toggle('overflow-hidden')
  })

  // listener open modal
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) {
        return
      }

      const modal = currentTarget.getAttribute('data-modal-open')
      if (!modal) {
        console.log('The type is not specified')
        return
      }

      modalWindow.open(modal)

      if (modal === 'cookie-preferences') {
        document.querySelector('[data-cookie="wrapper"]')?.style.display = 'none'
      }
    })
  })

  // listener modal close
  document
    .querySelectorAll('[data-modal-close], [data-window-close]')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        modalWindow.close()
      })
    })

  // listener modal close "Esc"
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') modalWindow.close()
  })
}
