/**
 * Fix anchor links
 */
export const fixAnchorLinks = () => {
  $('a[href^="#"]').on('click', event => {
    const href = $(event.currentTarget).attr('href')

    if (href.length < 2 || href.includes('w-tabs')) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    $('html, body').animate({ scrollTop: $(href).offset().top - 100 }, 800)
  })
}
