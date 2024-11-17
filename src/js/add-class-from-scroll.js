export const addActiveFromScrollDataRoom = () => {
  // add class 'active' from scroll page data-room
  const observerHeaders = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id')

        if (entry.isIntersecting) {
          document.querySelectorAll('[data-contents-link]').forEach(element => {
            element.classList.remove('active')
          })

          document.querySelector(`[href="#${id}"]`).classList.add('active')
        }
      })
    },
    { rootMargin: '15% 0px -85% 0px' }
  )

  document.querySelectorAll('h2[id]').forEach(item => {
    observerHeaders.observe(item)
  })
}
