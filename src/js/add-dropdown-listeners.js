export const addDropDownListeners = () => {
  document.querySelectorAll('[data-dropdown="toggle"]').forEach(element => {
    element.nextElementSibling.classList.remove('open')

    element.addEventListener('click', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) {
        return
      }

      if (currentTarget.classList.contains('open')) {
        currentTarget.classList.remove('open')
        currentTarget.nextElementSibling.classList.remove('open')
        currentTarget.classList.remove('open')
        currentTarget
          .querySelector(`[data-dropdown="arrow"]`)
          .classList.remove('open')

        return
      }
      currentTarget.classList.add('open')
      currentTarget.nextElementSibling.classList.add('open')
      currentTarget.classList.add('open')
      currentTarget
        .querySelector(`[data-dropdown="arrow"]`)
        .classList.add('open')
    })
  })
}
