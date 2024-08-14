/**
 * Fix anchor links
 */
export const fixAnchorLinks = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const href = event.currentTarget.getAttribute('href')

      if (href.length < 2 || href.includes('w-tabs')) {
        return
      }

      event.preventDefault()

      const targetElement = document.querySelector(href)
      if (!targetElement) {
        return
      }

      const top =
        window.innerWidth > 767
          ? targetElement.getBoundingClientRect().top + window.scrollY - 100
          : targetElement.getBoundingClientRect().top + window.scrollY - 86

      window.scrollTo({
        top: top,
        behavior: 'smooth',
      })

      window.location.hash = href
    })
  })
}
