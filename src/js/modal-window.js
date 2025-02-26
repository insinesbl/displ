/**
 * Modals
 */
export const modalWindow = {
  open: item => {
    const modals = document.querySelectorAll('[data-modal]')
    modals.forEach(modal => {
      if (modal instanceof HTMLElement) {
        modal.style.display = 'none'
        modal.style.opacity = '0'
      }
    })
    const modalsWrap = document.querySelector('[data-modals]')
    const modalItem = document.querySelector(`[data-modal="${item}"]`)
    const modalsWrapBg = modalItem.querySelector('[data-modal-bg]')

    if (modalsWrap) {
      modalsWrap.style.display = 'flex'
      modalsWrap.style.position = 'fixed'
      modalsWrap.style.left = '0'
      modalsWrap.style.top = '0'
      modalsWrap.style.right = '0'
      modalsWrap.style.bottom = '0'
    }

    if (modalsWrapBg) {
      modalsWrapBg.style.position = 'fixed'
    }

    if (modalItem) {
      modalItem.style.display = 'flex'
      setTimeout(() => {
        modalItem.style.opacity = '1'
      }, 50)
    }

    document.body.style.paddingRight = `${
      window.innerWidth - document.body.clientWidth
    }px`
    document.body.classList.add('overflow-hidden')
  },

  close: () => {
    const modals = document.querySelectorAll('[data-modal]')
    modals.forEach(modal => {
      if (modal instanceof HTMLElement) {
        modal.style.opacity = '0'
        setTimeout(() => {
          modal.style.display = 'none'
        }, 300)
      }
    })

    const modalsWrap = document.querySelector('[data-modals]')
    if (modalsWrap) {
      setTimeout(() => {
        modalsWrap.style.display = 'none'
      }, 300)
    }

    document.body.style.paddingRight = ''
    document.body.classList.remove('overflow-hidden')
  },
}
