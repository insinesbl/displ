export const addDropDownListeners = () => {
  const dropdowns = document.querySelectorAll('[data-dropdown="toggle"]')

  dropdowns.forEach(element => {
    element.classList.remove('open')
    element.nextElementSibling?.classList.remove('open')
    element.querySelector('[data-dropdown="arrow"]')?.classList.remove('open')
  })

  if (dropdowns.length > 0) {
    const firstDropdown = dropdowns[0]
    firstDropdown.classList.add('open')
    firstDropdown.nextElementSibling?.classList.add('open')
    firstDropdown
      .querySelector('[data-dropdown="arrow"]')
      ?.classList.add('open')
  }

  dropdowns.forEach(element => {
    element.addEventListener('click', ({ currentTarget }) => {
      if (!(currentTarget instanceof HTMLElement)) {
        return
      }

      const isOpen = currentTarget.classList.contains('open')

      if (isOpen) {
        currentTarget.classList.remove('open')
        currentTarget.nextElementSibling?.classList.remove('open')
        currentTarget
          .querySelector('[data-dropdown="arrow"]')
          ?.classList.remove('open')
      } else {
        currentTarget.classList.add('open')
        currentTarget.nextElementSibling?.classList.add('open')
        currentTarget
          .querySelector('[data-dropdown="arrow"]')
          ?.classList.add('open')
      }
    })
  })
}
